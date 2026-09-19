import { NextResponse } from "next/server";
import { listSections } from "../../../../lib/data";
import { SECTION_LABELS, SECTION_GROUPS } from "../../../../lib/sections";

export async function GET() {
  const sections = listSections().map((id) => ({
    id,
    label: SECTION_LABELS[id] || id.replace(/-/g, " "),
    group: SECTION_GROUPS[id] || "Other",
  }));
  return NextResponse.json({ sections });
}
