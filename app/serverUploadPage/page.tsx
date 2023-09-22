import { writeFile } from "fs/promises";
import { join } from "path";

export default async function handler(data: FormData) {
  // Function to handle file upload
    // You can implement your file upload logic here
    const file: File | null = data.get("file") as unknown as File;
    const fileExtension = file.name.split(".").pop();

    if (fileExtension === "mp3") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // With the file data in the buffer, you can do whatever you want with it.
      // For this, we'll just write it to the filesystem in a new location
      const path = join("./tmp", file.name);
      await writeFile(path, buffer);
      console.log("open ${path} to see the uploaded file");
      return { success: true, filePath: path }; // Return the file path
    } else {
      console.log("Invalid file format. Please upload an MP3 file.");
      return { success: false };
    }
}