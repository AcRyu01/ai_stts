// Imports the Google Cloud client library
const fs = require("fs");
const speech = require("@google-cloud/speech");

export const stt = (filename, lang) => {
  // Creates a client
  const client = new speech.SpeechClient({
    keyFilename: "",
  });

  async function quickstart() {
    const filePath = "./public/audio/" + filename;
    // const filePath = "/Users/acryu/Desktop/Lab/AI/" + filename;
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

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    console.log("Transcription: ", transcription);

    fs.writeFile("./app/api/sttts/output.txt", transcription, (err) => {
      if (err) console.error(err);
      else console.log("Data written to file successfully.");
    });
  }
  quickstart();
};
