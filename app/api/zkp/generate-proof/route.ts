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

    const { statement } = await req.json();
    const zkpSystem = new ZKPSystem();
    
    // Generate a new proof
    const secret = await zkpSystem.generateSecret();
    const commitment = await zkpSystem.generateCommitment(secret);
    
    // Store the commitment in Supabase
    const supabase = createClient();
    const { error } = await supabase
      .from('zkp_proofs')
      .insert({
        user_id: userId,
        commitment,
        statement,
        created_at: new Date().toISOString(),
      });

    if (error) {
      throw new Error('Failed to store proof');
    }

    return NextResponse.json({
      secret,
      commitment,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate proof" },
      { status: 500 }
    );
  }
}
