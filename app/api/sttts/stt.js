// Imports the Google Cloud client library
const fs = require("fs");
const speech = require("@google-cloud/speech");
require("dotenv").config();

export const stt = (filename, lang) => {
  // Creates a client
  const client = new speech.SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  return new Promise((resolve, reject) => {
    async function quickstart() {
      const filePath = "./public/audio/" + filename;
      const encoding = "MP3";
      const sampleRateHertz = 16000;
      const languageCode = lang;

      const config = {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
      };
      const audio = {
        content: fs.readFileSync(filePath).toString("base64"),
      };

      const request = {
        config: config,
        audio: audio,
      };

      try {
        // Detects speech in the audio file
        const [response] = await client.recognize(request);
        const transcription = response.results
          .map((result) => result.alternatives[0].transcript)
          .join("\n");
        console.log("Transcription: ", transcription);

        fs.writeFile("./app/api/sttts/output.txt", transcription, (err) => {
          if (err) {
            console.error(err);
            reject(err); // Reject the Promise on error
          } else {
            console.log("Data written to file successfully.");
            resolve(); // Resolve the Promise on success
          }
        });
      } catch (error) {
        console.error("Speech recognition error:", error);
        reject(error); // Reject the Promise on error
      }
    }

    quickstart();
  });
};
