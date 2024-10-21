import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export function ProofVerifier() {
  const [proof, setProof] = useState('');
  const [commitment, setCommitment] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const verifyProof = async () => {
    try {
      setLoading(true);
      setError('');
      
      // First get a challenge
      const challengeRes = await fetch('/api/zkp/challenge', {
        method: 'POST',
      });
      const { challenge } = await challengeRes.json();

      // Then verify the proof
      const response = await fetch('/api/zkp/verify-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proof, commitment, challenge }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setVerificationResult(data.isValid);
    } catch (err : any) {
      setError(err.message || 'Failed to verify proof');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Proof</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter commitment"
              value={commitment}
              onChange={(e) => setCommitment(e.target.value)}
            />
            <Input
              placeholder="Enter proof"
              value={proof}
              onChange={(e) => setProof(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={verifyProof}
            disabled={loading || !proof || !commitment}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Proof
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {verificationResult !== null && (
            <Alert variant={verificationResult ? "default" : "destructive"}>
              <AlertDescription className="flex items-center">
                {verificationResult ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    Proof verified successfully
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                    Proof verification failed
                  </>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}