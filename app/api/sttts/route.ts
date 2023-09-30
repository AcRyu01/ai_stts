import { NextRequest, NextResponse } from "next/server";
import { stt } from "./stt";
import { translate } from "./translate";
import { tts } from "./tts";
const fs = require("fs");

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const in_lang: string | null = data.get("lang") as unknown as string;
  const out_lang: string = in_lang === "th-TH" ? "en-US" : "th-TH";

  if (!file && !in_lang) {
    return NextResponse.json({ success: false });
  }
  await stt(file.name, in_lang);
  await translate(out_lang);
  await tts(out_lang);
  var inText = fs.readFileSync("./app/api/sttts/output.txt").toString();
  var outText = fs.readFileSync("./app/api/sttts/translated.txt").toString();
  return NextResponse.json({ success: true, inText: inText, outText: outText });
}
