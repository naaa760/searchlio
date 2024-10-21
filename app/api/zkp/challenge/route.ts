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

    const zkpSystem = new ZKPSystem();
    const challenge = await zkpSystem.generateChallenge();

    // Store the challenge
    const supabase = createClient();
    await supabase
      .from('zkp_challenges')
      .insert({
        user_id: userId,
        challenge,
        expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 min expiry
      });

    return NextResponse.json({ challenge });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate challenge" },
      { status: 500 }
    );
  }
}