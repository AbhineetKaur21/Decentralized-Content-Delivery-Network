
import React, { useState } from 'react';
import { Server, Wifi, WifiOff, MapPin, Clock, HardDrive } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PeerNodes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const nodes = [
    {
      id: 'node-001',
      location: 'New York, USA',
      status: 'online',
      uptime: '99.8%',
      storage: '2.4 TB',
      latency: '12ms',
      version: '1.2.3',
      type: 'storage'
    },
    {
      id: 'node-002', 
      location: 'London, UK',
      status: 'online',
      uptime: '99.6%',
      storage: '1.8 TB',
      latency: '8ms',
      version: '1.2.3',
      type: 'cache'
    },
    {
      id: 'node-003',
      location: 'Tokyo, Japan',
      status: 'online',
      uptime: '99.9%',
      storage: '3.2 TB',
      latency: '15ms',
      version: '1.2.2',
      type: 'storage'
    },
    {
      id: 'node-004',
      location: 'Sydney, Australia',
      status: 'offline',
      uptime: '97.2%',
      storage: '1.2 TB',
      latency: '28ms',
      version: '1.2.1',
      type: 'cache'
    },
    {
      id: 'node-005',
      location: 'Frankfurt, Germany',
      status: 'online',
      uptime: '99.4%',
      storage: '2.8 TB',
      latency: '6ms',
      version: '1.2.3',
      type: 'storage'
    },
    {
      id: 'node-006',
      location: 'Singapore',
      status: 'online',
      uptime: '99.7%',
      storage: '2.1 TB',
      latency: '11ms',
      version: '1.2.3',
      type: 'cache'
    }
  ];

  const filteredNodes = nodes.filter(node =>
    node.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onlineNodes = nodes.filter(node => node.status === 'online').length;
  const totalStorage = nodes.reduce((sum, node) => {
    return sum + parseFloat(node.storage.replace(' TB', ''));
  }, 0);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Nodes</p>
                <p className="text-2xl font-bold text-green-600">{onlineNodes}/{nodes.length}</p>
              </div>
              <Server className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Storage</p>
                <p className="text-2xl font-bold text-blue-600">{totalStorage.toFixed(1)} TB</p>
              </div>
              <HardDrive className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Latency</p>
                <p className="text-2xl font-bold text-purple-600">13ms</p>
              </div>
              <Wifi className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-5 h-5" />
            <span>Network Nodes</span>
          </CardTitle>
          <CardDescription>
            Monitor and manage peer nodes in the dCDN network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              placeholder="Search nodes by location or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="space-y-4">
            {filteredNodes.map((node) => (
              <div key={node.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${node.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{node.id}</h4>
                        <Badge variant={node.type === 'storage' ? 'default' : 'secondary'}>
                          {node.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{node.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="text-gray-600">Uptime</div>
                      <div className="font-medium">{node.uptime}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600">Storage</div>
                      <div className="font-medium">{node.storage}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600">Latency</div>
                      <div className="font-medium">{node.latency}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600">Version</div>
                      <div className="font-medium">{node.version}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {node.status === 'online' ? (
                      <Wifi className="w-5 h-5 text-green-600" />
                    ) : (
                      <WifiOff className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeerNodes;
