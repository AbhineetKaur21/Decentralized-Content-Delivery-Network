
import React, { useState, useEffect } from 'react';
import { Upload, Download, Globe, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import UploadSection from '@/components/UploadSection';
import FileList from '@/components/FileList';
import NetworkStats from '@/components/NetworkStats';
import PeerNodes from '@/components/PeerNodes';

const Index = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate connection to ICP network
    const timer = setTimeout(() => {
      setIsConnected(true);
      toast.success('Connected to ICP Network');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFileUpload = (file) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const newFile = {
            id: Date.now(),
            name: file.name,
            size: file.size,
            uploadDate: new Date().toISOString(),
            downloadCount: 0,
            replicas: Math.floor(Math.random() * 5) + 3
          };
          setFiles(prev => [newFile, ...prev]);
          toast.success(`File "${file.name}" uploaded successfully!`);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">dCDN</h1>
                <p className="text-sm text-gray-600">Decentralized Content Delivery Network</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${isConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="text-sm font-medium">{isConnected ? 'Connected' : 'Connecting...'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Decentralized Content Delivery
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload, store, and distribute your content across a global decentralized network built on the Internet Computer Protocol
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Secure</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Fast</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Decentralized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="upload">Upload Files</TabsTrigger>
              <TabsTrigger value="files">My Files</TabsTrigger>
              <TabsTrigger value="network">Network Stats</TabsTrigger>
              <TabsTrigger value="nodes">Peer Nodes</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <UploadSection onFileUpload={handleFileUpload} uploadProgress={uploadProgress} />
            </TabsContent>

            <TabsContent value="files">
              <FileList files={files} setFiles={setFiles} />
            </TabsContent>

            <TabsContent value="network">
              <NetworkStats />
            </TabsContent>

            <TabsContent value="nodes">
              <PeerNodes />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Index;
