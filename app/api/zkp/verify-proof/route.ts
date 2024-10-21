import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { ZKPSystem } from "@/lib/zkp/ZKPsystem";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { proof, challenge, commitment } = await req.json();
    const zkpSystem = new ZKPSystem();
    
    // Verify the proof
    const isValid = await zkpSystem.verifyProof(
      commitment,
      challenge,
      proof
    );

    // Record verification attempt
    const supabase = createClient();
    await supabase
      .from('zkp_verifications')
      .insert({
        user_id: userId,
        commitment,
        is_valid: isValid,
        verified_at: new Date().toISOString(),
      });

    return NextResponse.json({ isValid });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify proof" },
      { status: 500 }
    );
  }
}