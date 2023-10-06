import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

import fs from "fs"; // Import the 'fs' module

export async function GET(request: NextRequest) {
  // Get the filename from the request query
  // const filename = "6.mp3";

  // Determine the file path based on the filename
  const filePath = "./public/audio/output.mp3";
  // const filePath = join('./tmp/', filename);

  try {
    // Check if the file exists
    await fs.promises.access(filePath);

    // Determine the file type (you may need to adjust this based on your files)
    const fileType = "audio/mpeg";

    // Read the file content
    const fileContents = await readFile(filePath);

    // Set the response headers for the file download
    const headers = {
      "Content-Type": fileType,
      //   'Content-Disposition': `attachment; filename="${filename}"`,
      "Content-Length": fileContents.length.toString(),
    };

    return new Response(fileContents, { headers });
  } catch (error) {
    console.error(error);
    // Return a 404 response if the file is not found
    return new Response("File not found", { status: 404 });
  }
}
