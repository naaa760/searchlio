import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const ResultCard = ({ result }) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-blue-400 hover:underline">
          <a href={result.url} target="_blank" rel="noopener noreferrer">
            {result.title}
          </a>
        </CardTitle>
        <CardDescription className="text-gray-400">
          {result.url}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{result.snippet}</p>
        <div className="mt-2 flex gap-2">
          <Badge variant="outline">
            Privacy Score: {result.privacyScore}%
          </Badge>
          {result.secureConnection && (
            <Badge variant="outline" className="bg-green-900 text-green-200">
              Secure Connection
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;