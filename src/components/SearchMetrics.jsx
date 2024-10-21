// src/components/search/SearchMetrics.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Shield, 
  Clock, 
  Lock,
  AlertTriangle 
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const MetricCard = ({ icon: Icon, title, value, description, variant = "default" }) => (
  <Card className="bg-gray-800 border-gray-700">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-300">{title}</span>
        </div>
        <Badge variant={variant}>{value}</Badge>
      </div>
      {description && (
        <p className="text-xs text-gray-400">{description}</p>
      )}
    </CardContent>
  </Card>
);

const SearchMetrics = ({ metrics }) => {
  const getPrivacyScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPrivacyScoreVariant = (score) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'destructive';
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          icon={Search}
          title="Results Found"
          value={metrics.totalResults}
          description="Total matching results"
        />
        
        <MetricCard
          icon={Clock}
          title="Search Time"
          value={`${metrics.searchTime}s`}
          description="Time to process and fetch results"
        />
        
        <MetricCard
          icon={Shield}
          title="Privacy Score"
          value={`${metrics.privacyScore}%`}
          variant={getPrivacyScoreVariant(metrics.privacyScore)}
          description="Average privacy rating of results"
        />
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Lock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">Privacy Analysis</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Overall Privacy Score</span>
              <span className={`text-xs font-medium ${getPrivacyScoreColor(metrics.privacyScore)}`}>
                {metrics.privacyScore}%
              </span>
            </div>
            
            <Progress 
              value={metrics.privacyScore} 
              className="h-2"
            />
            
            {metrics.privacyScore < 70 && (
              <div className="flex items-center space-x-1 mt-2">
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                <span className="text-xs text-yellow-500">
                  Some results may not meet our privacy standards
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchMetrics;