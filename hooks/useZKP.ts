import { useState } from 'react';
import type { ProofGenerationResponse, VerificationResponse } from '@/app/types/zkp';

export function useProofGeneration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProofGenerationResponse | null>(null);

  const generateProof = async (statement: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/zkp/generate-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statement }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setResult(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate proof');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generateProof, loading, error, result };
}

export function useProofVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResponse | null>(null);

  const verifyProof = async (proof: string, commitment: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const challengeRes = await fetch('/api/zkp/challenge', {
        method: 'POST',
      });
      
      if (!challengeRes.ok) {
        throw new Error('Failed to generate challenge');
      }
      
      const { challenge } = await challengeRes.json();

      const response = await fetch('/api/zkp/verify-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proof, commitment, challenge }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setResult(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify proof');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { verifyProof, loading, error, result };
}