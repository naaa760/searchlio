import { buildMimcSponge } from 'circomlib';
import { BigNumber } from 'ethers';
import hash from 'hash.js';

export class ZKPSystem {
  private mimc: any;

  constructor() {
    this.mimc = buildMimcSponge();
  }

  async generateSecret(): Promise<string> {
    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    return Buffer.from(randomBytes).toString('hex');
  }

  async generateCommitment(secret: string): Promise<string> {
    const secretBigNum = BigNumber.from('0x' + secret);
    const commitment = this.mimc.multiHash([secretBigNum]);
    return commitment.toString();
  }

  async generateProof(secret: string, challenge: string): Promise<string> {
    const secretBigNum = BigNumber.from('0x' + secret);
    const challengeBigNum = BigNumber.from('0x' + challenge);
    
    // Using Fiat-Shamir transform to generate non-interactive proof
    const response = this.mimc.multiHash([secretBigNum, challengeBigNum]);
    return response.toString();
  }

  // Verify a proof
  async verifyProof(
    commitment: string,
    challenge: string,
    proof: string
  ): Promise<boolean> {
    const commitmentBigNum = BigNumber.from(commitment);
    const challengeBigNum = BigNumber.from('0x' + challenge);
    const proofBigNum = BigNumber.from(proof);

    const expectedResponse = this.mimc.multiHash([commitmentBigNum, challengeBigNum]);
    return proofBigNum.eq(expectedResponse);
  }

  // Generate a random challenge
  async generateChallenge(): Promise<string> {
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    return Buffer.from(randomBytes).toString('hex');
  }
}

// Helper function to hash sensitive data
export const hashData = (data: string): string => {
  return hash.sha256().update(data).digest('hex');
};