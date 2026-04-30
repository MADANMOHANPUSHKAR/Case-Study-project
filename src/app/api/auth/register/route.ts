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

    // Format embedding for pgvector: [val1, val2, ...]
    const vectorString = `[${embedding.join(",")}]`;
    const newId = crypto.randomUUID();

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
