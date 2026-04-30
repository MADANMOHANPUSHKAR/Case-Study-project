import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // body: { facility_id, user_id, start_time, end_time }
    
    // Check capacity before booking
    const { count, error: countError } = await supabase
      .from("facility_bookings")
      .select("*", { count: "exact", head: true })
      .eq("facility_id", body.facility_id)
      .eq("start_time", body.start_time)
      .neq("status", "cancelled");

    if (countError) throw countError;

    const { data: facility } = await supabase
      .from("facilities")
      .select("max_capacity")
      .eq("id", body.facility_id)
      .single();

    if (facility && count !== null && count >= facility.max_capacity) {
      return NextResponse.json({ error: "Slot is full" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("facility_bookings")
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

    let query = supabase.from("facility_bookings").select("*, facilities(name, type)");
    
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
