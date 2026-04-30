import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { embedding } = await request.json();

    if (!embedding || !Array.isArray(embedding) || embedding.length !== 128) {
      return NextResponse.json(
        { error: "Invalid face embedding" },
        { status: 400 }
      );
    }

    // Mock for demo if no real Supabase credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      console.warn("Using mock login. Database not configured.");
      return NextResponse.json({ success: true, userId: "00000000-0000-0000-0000-000000000000" });
    }

    // Convert JS array to Postgres vector format: '[0.1, 0.2, ...]'
    const vectorString = `[${embedding.join(",")}]`;

    // threshold of 0.6 is common for face-api.js euclidean/cosine distance
    const { data, error } = await supabase
      .rpc("match_face", {
        query_embedding: vectorString,
        match_threshold: 0.6,
      });

    if (error) {
      console.error("Match error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: "Face not recognized. Please register first." },
        { status: 401 }
      );
    }

    // In a real app, we would create a session/JWT here
    return NextResponse.json({ success: true, userId: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
