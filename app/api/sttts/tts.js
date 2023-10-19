// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

// Import other required libraries
const fs = require("fs");
const util = require("util");
require("dotenv").config();

export const tts = (lang) => {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  return new Promise(async (resolve, reject) => {
    async function quickStart() {
      try {
        // The text to synthesize
        var text = fs.readFileSync("./app/api/sttts/translated.txt").toString();

        // Construct the request
        const request = {
          input: { text: text },
          // Select the language and SSML voice gender (optional)
          voice: { languageCode: lang, ssmlGender: "FEMALE" },
          // Select the type of audio encoding
          audioConfig: { audioEncoding: "MP3" },
        };

        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);

        // Write the binary audio content to a local file
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(
          "./public/audio/output.mp3",
          response.audioContent,
          "binary"
        );

        console.log("Audio content written to file: output.mp3");
        resolve(); // Resolve the Promise on success
      } catch (error) {
        console.error("Text-to-speech error:", error);
        reject(error); // Reject the Promise on error
      }
    }

    quickStart();
  });
};
