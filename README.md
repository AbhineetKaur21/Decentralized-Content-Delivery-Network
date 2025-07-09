
# dCDN - Decentralized Content Delivery Network

A modern, decentralized content delivery network built on the Internet Computer Protocol (ICP) using React frontend and Rust backend.

## 🚀 Features

- **Decentralized Storage**: Files are distributed across multiple nodes for redundancy
- **Global CDN**: Worldwide network of nodes for fast content delivery
- **Privacy Controls**: Public and private file sharing options
- **Real-time Analytics**: Monitor network performance and usage statistics
- **Peer-to-Peer Network**: Direct node-to-node content distribution
- **Censorship Resistant**: Decentralized architecture prevents single points of failure

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js and npm**
   ```bash
   # Download from https://nodejs.org/
   node --version  # Should be v16 or higher
   npm --version
   ```

2. **Rust and Cargo**
   ```bash
   # Install from https://rustup.rs/
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   rustc --version
   cargo --version
   ```

3. **DFINITY SDK**
   ```bash
   sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
   dfx --version
   ```

## 🛠️ Installation & Setup

1. **Clone or download this project**
   ```bash
   # If you have git:
   git clone <repository-url>
   cd dcdn
   
   # Or extract the downloaded files and navigate to the directory
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Add required dependencies for ICP integration**
   ```bash
   npm install @dfinity/agent @dfinity/candid @dfinity/principal
   ```

## 🚀 Local Development

1. **Start the local development environment**
   ```bash
   # Start the frontend development server
   npm run dev
   ```

2. **Deploy to local ICP replica** (in a new terminal)
   ```bash
   # Make the deploy script executable
   chmod +x deploy.sh
   
   # Run the deployment script
   ./deploy.sh
   ```

The script will:
- Start a local ICP replica
- Deploy the Rust backend canister
- Build and deploy the React frontend
- Provide you with local URLs to access your dCDN

## 🌍 Deploy to Mainnet

1. **Get cycles for deployment**
   - Visit https://faucet.dfinity.org/ to get free cycles for testing
   - Or purchase cycles for production deployment

2. **Deploy to Internet Computer mainnet**
   ```bash
   # Make the mainnet deploy script executable
   chmod +x deploy-mainnet.sh
   
   # Deploy to mainnet
   ./deploy-mainnet.sh
   ```

## 📁 Project Structure

```
dcdn/
├── src/
│   ├── components/           # React components
│   │   ├── UploadSection.tsx # File upload interface
│   │   ├── FileList.tsx      # File management
│   │   ├── NetworkStats.tsx  # Network statistics
│   │   └── PeerNodes.tsx     # Node management
│   ├── pages/
│   │   └── Index.tsx         # Main application page
│   └── dcdn_backend/         # Rust backend
│       ├── src/lib.rs        # Main backend logic
│       └── Cargo.toml        # Rust dependencies
├── dfx.json                  # ICP configuration
├── deploy.sh                 # Local deployment script
├── deploy-mainnet.sh         # Mainnet deployment script
└── README.md                 # This file
```

## 🔧 Usage

### Uploading Files
1. Navigate to the "Upload Files" tab
2. Drag and drop files or click to browse
3. Choose privacy settings (public/private)
4. Click "Upload to Network"

### Managing Files
1. View uploaded files in the "My Files" tab
2. Download, share, or delete files as needed
3. Copy shareable links for public files

### Monitoring Network
1. Check network statistics in the "Network Stats" tab
2. Monitor peer nodes in the "Peer Nodes" tab
3. View real-time performance metrics

## 🔒 Security Features

- **Cryptographic Hashing**: All files are identified by secure hashes
- **Access Control**: Private files are only accessible by owners
- **Decentralized Verification**: Network consensus for file integrity
- **Immutable Storage**: Files cannot be modified once uploaded

## 🌐 Network Architecture

The dCDN operates on a peer-to-peer network where:
- Multiple nodes store file replicas for redundancy
- Closest nodes serve content for optimal performance
- Automatic failover ensures high availability
- Load balancing distributes traffic efficiently

## 📊 Monitoring & Analytics

Track important metrics:
- **Upload/Download Statistics**: Monitor data transfer rates
- **Node Performance**: Track uptime and response times
- **Storage Utilization**: View network-wide storage usage
- **User Activity**: Analyze usage patterns

## 🚨 Troubleshooting

### Common Issues

1. **"dfx not found" error**
   ```bash
   # Reinstall DFINITY SDK
   sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
   ```

2. **Build failures**
   ```bash
   # Clean and rebuild
   dfx stop
   dfx start --clean --background
   ./deploy.sh
   ```

3. **Frontend not loading**
   ```bash
   # Rebuild frontend
   npm run build
   dfx deploy dcdn_frontend
   ```

4. **Cycles balance issues**
   - Visit https://faucet.dfinity.org/ for test cycles
   - Check balance: `dfx wallet --network ic balance`

## 📚 Additional Resources

- [Internet Computer Documentation](https://internetcomputer.org/docs/)
- [DFINITY SDK Guide](https://sdk.dfinity.org/docs/)
- [Rust Canister Development](https://internetcomputer.org/docs/current/developer-docs/backend/rust/)
- [React on ICP](https://internetcomputer.org/docs/current/developer-docs/frontend/)

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

## 📄 License

This project is licensed under the MIT License.

---

**Happy building your decentralized CDN! 🎉**

For questions or support, refer to the Internet Computer community forums or documentation.
