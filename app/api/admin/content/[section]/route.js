import { NextResponse } from "next/server";
import { getContent, saveContent } from "../../../../../lib/data";

export async function GET(request, { params }) {
  const { section } = await params;
  const content = getContent(section, null);
  if (content === null) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ content });
}

export async function PUT(request, { params }) {
  const { section } = await params;
  const body = await request.json().catch(() => null);
  if (body === null || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const saved = saveContent(section, body);
  return NextResponse.json({ content: saved });
}
