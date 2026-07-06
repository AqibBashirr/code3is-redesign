import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ version: process.env.NEXT_PUBLIC_BUILD_ID });
}
