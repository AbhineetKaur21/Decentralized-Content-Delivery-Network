
import React from 'react';
import { Activity, Globe, HardDrive, Users, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const NetworkStats = () => {
  const stats = [
    {
      title: "Total Nodes",
      value: "1,247",
      change: "+12%",
      icon: Globe,
      color: "text-blue-600"
    },
    {
      title: "Files Stored",
      value: "2.3M",
      change: "+8%",
      icon: HardDrive,
      color: "text-green-600"
    },
    {
      title: "Active Users",
      value: "45,892",
      change: "+15%",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Network Speed",
      value: "1.2 Gbps",
      change: "+5%",
      icon: Zap,
      color: "text-yellow-600"
    }
  ];

  const networkHealth = [
    { region: "North America", nodes: 342, uptime: 99.8, usage: 78 },
    { region: "Europe", nodes: 298, uptime: 99.6, usage: 82 },
    { region: "Asia Pacific", nodes: 387, uptime: 99.9, usage: 71 },
    { region: "South America", nodes: 156, uptime: 99.4, usage: 65 },
    { region: "Africa", nodes: 64, uptime: 99.2, usage: 58 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Network Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Network Health by Region</span>
          </CardTitle>
          <CardDescription>
            Real-time status of nodes across different geographical regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {networkHealth.map((region, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">{region.region}</span>
                    <span className="text-sm text-gray-600">({region.nodes} nodes)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{region.uptime}% uptime</div>
                    <div className="text-xs text-gray-600">{region.usage}% usage</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Uptime</span>
                      <span>{region.uptime}%</span>
                    </div>
                    <Progress value={region.uptime} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Usage</span>
                      <span>{region.usage}%</span>
                    </div>
                    <Progress value={region.usage} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Transfer</CardTitle>
            <CardDescription>Network throughput over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Upload</span>
                <span className="text-sm font-medium">142.3 TB</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Download</span>
                <span className="text-sm font-medium">298.7 TB</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Utilization</CardTitle>
            <CardDescription>Distributed storage across the network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">847.2 PB</div>
                <div className="text-sm text-gray-600">Total Network Storage</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Used</span>
                  <span className="font-medium">623.4 PB (73.6%)</span>
                </div>
                <Progress value={73.6} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NetworkStats;
