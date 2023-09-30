// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;
const fs = require("fs");
require("dotenv").config();

export const translate = (targetLang) => {
  // Creates a client
  const translateClient = new Translate({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  return new Promise((resolve, reject) => {
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    var text = fs.readFileSync("./app/api/sttts/output.txt").toString();
    const target = targetLang === "th-TH" ? "th" : "en";

    async function translateText() {
      try {
        // Translates the text into the target language. "text" can be a string for
        // translating a single piece of text, or an array of strings for translating
        // multiple texts.
        let [translations] = await translateClient.translate(text, target);
        translations = Array.isArray(translations)
          ? translations
          : [translations];
        console.log("Translations:");
        translations.forEach((translation, i) => {
          console.log(`${text[i]} => (${target}) ${translation}`);

          fs.writeFile("./app/api/sttts/translated.txt", translation, (err) => {
            if (err) {
              console.error(err);
              reject(err); // Reject the Promise on error
            } else {
              console.log("Data written to file successfully.");
              resolve(); // Resolve the Promise on success
            }
          });
        });
      } catch (error) {
        console.error("Translation error:", error);
        reject(error); // Reject the Promise on error
      }
    }

    translateText();
  });
};
