
use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::management_canister::main::raw_rand;
use ic_cdk::api::time;
use ic_cdk::{caller, query, update};
use serde::Serialize;
use sha2::{Digest, Sha256};
use std::collections::HashMap;

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct FileMetadata {
    pub id: String,
    pub name: String,
    pub size: u64,
    pub content_type: String,
    pub upload_time: u64,
    pub owner: Principal,
    pub download_count: u64,
    pub replica_count: u8,
    pub is_public: bool,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct UploadRequest {
    pub name: String,
    pub content_type: String,
    pub data: Vec<u8>,
    pub is_public: bool,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct FileChunk {
    pub file_id: String,
    pub chunk_index: u32,
    pub data: Vec<u8>,
    pub total_chunks: u32,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct NodeInfo {
    pub id: String,
    pub location: String,
    pub storage_capacity: u64,
    pub used_storage: u64,
    pub uptime_percentage: f64,
    pub last_seen: u64,
    pub node_type: String,
}

thread_local! {
    static FILES: std::cell::RefCell<HashMap<String, FileMetadata>> = std::cell::RefCell::new(HashMap::new());
    static FILE_DATA: std::cell::RefCell<HashMap<String, Vec<u8>>> = std::cell::RefCell::new(HashMap::new());
    static NODES: std::cell::RefCell<HashMap<String, NodeInfo>> = std::cell::RefCell::new(HashMap::new());
    static USER_FILES: std::cell::RefCell<HashMap<Principal, Vec<String>>> = std::cell::RefCell::new(HashMap::new());
}

fn generate_file_id() -> String {
    let rand_bytes = raw_rand().unwrap().0;
    let mut hasher = Sha256::new();
    hasher.update(&rand_bytes);
    let result = hasher.finalize();
    format!("{:x}", result)[0..16].to_string()
}

#[update]
pub fn upload_file(request: UploadRequest) -> Result<String, String> {
    if request.data.is_empty() {
        return Err("File data cannot be empty".to_string());
    }

    if request.data.len() > 100_000_000 {
        return Err("File size exceeds 100MB limit".to_string());
    }

    let file_id = generate_file_id();
    let owner = caller();
    let current_time = time();

    let metadata = FileMetadata {
        id: file_id.clone(),
        name: request.name,
        size: request.data.len() as u64,
        content_type: request.content_type,
        upload_time: current_time,
        owner,
        download_count: 0,
        replica_count: 3,
        is_public: request.is_public,
    };

    FILES.with(|files| {
        files.borrow_mut().insert(file_id.clone(), metadata);
    });

    FILE_DATA.with(|data| {
        data.borrow_mut().insert(file_id.clone(), request.data);
    });

    USER_FILES.with(|user_files| {
        let mut files = user_files.borrow_mut();
        files.entry(owner).or_insert_with(Vec::new).push(file_id.clone());
    });

    Ok(file_id)
}

#[query]
pub fn get_file_metadata(file_id: String) -> Result<FileMetadata, String> {
    FILES.with(|files| {
        files.borrow()
            .get(&file_id)
            .cloned()
            .ok_or_else(|| "File not found".to_string())
    })
}

#[query]
pub fn download_file(file_id: String) -> Result<Vec<u8>, String> {
    let metadata = FILES.with(|files| {
        files.borrow().get(&file_id).cloned()
    }).ok_or("File not found")?;

    let caller_principal = caller();
    if !metadata.is_public && metadata.owner != caller_principal {
        return Err("Access denied".to_string());
    }

    FILES.with(|files| {
        let mut files_mut = files.borrow_mut();
        if let Some(file) = files_mut.get_mut(&file_id) {
            file.download_count += 1;
        }
    });

    FILE_DATA.with(|data| {
        data.borrow()
            .get(&file_id)
            .cloned()
            .ok_or_else(|| "File data not found".to_string())
    })
}

#[query]
pub fn list_user_files() -> Vec<FileMetadata> {
    let caller_principal = caller();
    
    USER_FILES.with(|user_files| {
        let file_ids = user_files.borrow()
            .get(&caller_principal)
            .cloned()
            .unwrap_or_default();

        FILES.with(|files| {
            let files_ref = files.borrow();
            file_ids.iter()
                .filter_map(|id| files_ref.get(id).cloned())
                .collect()
        })
    })
}

#[query]
pub fn list_public_files() -> Vec<FileMetadata> {
    FILES.with(|files| {
        files.borrow()
            .values()
            .filter(|file| file.is_public)
            .cloned()
            .collect()
    })
}

#[update]
pub fn delete_file(file_id: String) -> Result<(), String> {
    let caller_principal = caller();
    
    let metadata = FILES.with(|files| {
        files.borrow().get(&file_id).cloned()
    }).ok_or("File not found")?;

    if metadata.owner != caller_principal {
        return Err("Only file owner can delete the file".to_string());
    }

    FILES.with(|files| {
        files.borrow_mut().remove(&file_id);
    });

    FILE_DATA.with(|data| {
        data.borrow_mut().remove(&file_id);
    });

    USER_FILES.with(|user_files| {
        let mut files = user_files.borrow_mut();
        if let Some(file_list) = files.get_mut(&caller_principal) {
            file_list.retain(|id| id != &file_id);
        }
    });

    Ok(())
}

#[update]
pub fn register_node(info: NodeInfo) -> Result<(), String> {
    let current_time = time();
    let mut node_info = info;
    node_info.last_seen = current_time;

    NODES.with(|nodes| {
        nodes.borrow_mut().insert(node_info.id.clone(), node_info);
    });

    Ok(())
}

#[query]
pub fn get_network_stats() -> HashMap<String, u64> {
    let mut stats = HashMap::new();

    let total_files = FILES.with(|files| files.borrow().len() as u64);
    let total_storage = FILES.with(|files| {
        files.borrow().values().map(|f| f.size).sum::<u64>()
    });
    let total_downloads = FILES.with(|files| {
        files.borrow().values().map(|f| f.download_count).sum::<u64>()
    });
    let active_nodes = NODES.with(|nodes| nodes.borrow().len() as u64);

    stats.insert("total_files".to_string(), total_files);
    stats.insert("total_storage".to_string(), total_storage);
    stats.insert("total_downloads".to_string(), total_downloads);
    stats.insert("active_nodes".to_string(), active_nodes);

    stats
}

#[query]
pub fn list_nodes() -> Vec<NodeInfo> {
    NODES.with(|nodes| {
        nodes.borrow().values().cloned().collect()
    })
}

#[update]
pub fn update_node_heartbeat(node_id: String) -> Result<(), String> {
    let current_time = time();
    
    NODES.with(|nodes| {
        let mut nodes_mut = nodes.borrow_mut();
        if let Some(node) = nodes_mut.get_mut(&node_id) {
            node.last_seen = current_time;
            Ok(())
        } else {
            Err("Node not found".to_string())
        }
    })
}

// Export the candid interface
ic_cdk::export_candid!();
