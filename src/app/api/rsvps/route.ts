import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // body: { event_id, user_id }
    
    // Check capacity before RSVP
    const { count, error: countError } = await supabase
      .from("event_rsvps")
      .select("*", { count: "exact", head: true })
      .eq("event_id", body.event_id)
      .neq("status", "cancelled");

    if (countError) throw countError;

    const { data: event } = await supabase
      .from("events")
      .select("capacity")
      .eq("id", body.event_id)
      .single();

    if (event && count !== null && count >= event.capacity) {
      return NextResponse.json({ error: "Event is full" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("event_rsvps")
      .insert(body)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    let query = supabase.from("event_rsvps").select("*, events(title, date, is_workshop)");
    
    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
