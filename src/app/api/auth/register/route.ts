import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, full_name, embedding } = body;

    if (!email || !full_name || !embedding || embedding.length !== 128) {
      return NextResponse.json({ error: "Invalid registration data" }, { status: 400 });
    }

    const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@[a-zA-Z0-9]+students\.sau\.ac\.in$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid college email format" }, { status: 400 });
    }

    const newId = crypto.randomUUID();

    // Mock for demo if no real Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      console.warn("Using mock registration. Database not configured.");
      return NextResponse.json({ success: true, userId: newId });
    }

    const vectorString = `[${embedding.join(",")}]`;

    const { error } = await supabase.from("profiles").insert({
      id: newId,
      email,
      full_name,
      face_embedding: vectorString,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, userId: newId });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
