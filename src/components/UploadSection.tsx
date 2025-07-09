
import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const UploadSection = ({ onFileUpload, uploadProgress }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Content</span>
          </CardTitle>
          <CardDescription>
            Upload your files to the decentralized network
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports all file types up to 100MB
            </p>
            <Input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                Browse Files
              </Button>
            </Label>
          </div>

          {selectedFile && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <File className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={handleUpload} className="w-full">
                Upload to Network
              </Button>
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Benefits</CardTitle>
          <CardDescription>Why use our decentralized CDN?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
              <Upload className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Global Distribution</h4>
              <p className="text-sm text-gray-600">Your files are automatically replicated across multiple nodes worldwide</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
              <Upload className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Censorship Resistant</h4>
              <p className="text-sm text-gray-600">Decentralized storage ensures your content stays available</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
              <Upload className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Cost Effective</h4>
              <p className="text-sm text-gray-600">Pay only for what you use with transparent pricing</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadSection;
