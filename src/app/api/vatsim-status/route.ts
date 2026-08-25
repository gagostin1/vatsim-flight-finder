import { NextResponse } from "next/server";
import { getVatsimStatus } from "@/lib/vatsim/client";

export async function GET() {
  try {
    return NextResponse.json(await getVatsimStatus());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Live VATSIM data is temporarily unavailable." }, { status: 502 });
  }
}
