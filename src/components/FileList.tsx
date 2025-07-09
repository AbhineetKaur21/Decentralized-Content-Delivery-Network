
import React from 'react';
import { Download, Trash2, Eye, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const FileList = ({ files, setFiles }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDownload = (file) => {
    setFiles(prev => prev.map(f => 
      f.id === file.id 
        ? { ...f, downloadCount: f.downloadCount + 1 }
        : f
    ));
    toast.success(`Downloading ${file.name}`);
  };

  const handleDelete = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast.success('File deleted successfully');
  };

  const handleCopyLink = (file) => {
    const link = `https://dcdn.network/file/${file.id}`;
    navigator.clipboard.writeText(link);
    toast.success('Download link copied to clipboard');
  };

  if (files.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No files uploaded yet</h3>
          <p className="text-gray-600">Upload your first file to get started with the dCDN network</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Uploaded Files ({files.length})</h3>
        <Badge variant="secondary">{files.reduce((acc, f) => acc + f.downloadCount, 0)} total downloads</Badge>
      </div>
      
      <div className="grid gap-4">
        {files.map((file) => (
          <Card key={file.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{file.name}</h4>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span>{formatFileSize(file.size)}</span>
                        <span>Uploaded {formatDate(file.uploadDate)}</span>
                        <span>{file.downloadCount} downloads</span>
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{file.replicas} replicas</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyLink(file)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(file)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FileList;
