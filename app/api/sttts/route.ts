import { NextRequest, NextResponse } from "next/server";
import { stt } from "./stt";
import { translate } from "./translate";
import { tts } from "./tts";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const in_lang: string | null = data.get("lang") as unknown as string;
  const out_lang: string = in_lang === "th-TH" ? "en-US" : "th-TH";

  if (!file && !in_lang) {
    return NextResponse.json({ success: false });
  }
  stt(file.name, in_lang);
  translate(out_lang);
  tts(out_lang);

  return NextResponse.json({ success: true });
}
