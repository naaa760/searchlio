import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export function ProofGenerator() {
  const [statement, setStatement] = useState('');
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');

  const generateProof = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/zkp/generate-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statement }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setSecret(data.secret);
    } catch (err : any) {
      setError(err.message || 'Failed to generate proof');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate New Proof</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter statement to prove"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={generateProof}
            disabled={loading || !statement}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Proof
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {secret && (
            <Alert>
              <AlertDescription className="font-mono text-sm break-all">
                Secret: {secret}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}