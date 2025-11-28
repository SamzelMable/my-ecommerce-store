// app/api/save-order/route.ts
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { clerk_user_id, items, total_cents } = await request.json();
  
  const supabase = await createServerSupabaseClient();
  
  const { error } = await supabase
    .from("orders")
    .insert({
      clerk_user_id,
      items,
      total_cents,
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}