// import Image from "next/image";
"use client";
import React, { useState } from "react";

interface IText {
  inputText: string;
  translatedText: string;
}
interface ISTTTSRes {
  success: boolean;
  inText: string;
  outText: string;
}
enum ECompleteStage {
  wait,
  process,
  complete,
  fileInvalid,
}

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState("th-TH"); // Default language
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isComplete, setIsComplete] = useState<ECompleteStage>(
    ECompleteStage.wait
  );
  const [text, setText] = useState<IText>({
    inputText: "",
    translatedText: "",
  });
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const handleFileChange = (event: any) => {
    // Get the selected file from the input field
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleLanguageSwap = () => {
    // Function to toggle between Thai ("th") and English ("en")
    setCurrentLanguage(currentLanguage === "th-TH" ? "en-US" : "th-TH");
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      // upload file
      try {
        // if (selectedFile.type !== "audio/mpeg") {
        //   setIsComplete(ECompleteStage.fileInvalid);
        //   return;
        // }
        // alert("hehe");
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("File uploaded successfully. File path:", data.filePath);
        } else {
          const errorData = await response.json();
          console.error("File upload failed. Error:", errorData.error);
        }
      } catch (error) {
        console.error("An error occurred while uploading the file:", error);
      }
      // sttts
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("lang", currentLanguage);
        const response = await fetch("/api/sttts", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data: ISTTTSRes = await response.json();
          console.log(data.success);
          setIsComplete(ECompleteStage.complete);
          setText({
            inputText: data.inText,
            translatedText: data.outText,
          });
          console.log("STTTS successfully");
        } else {
          const errorData = await response.json();
          console.error("STTTS failed. Error:", errorData.error);
        }
      } catch (error) {
        console.error("An error occurred while sttts the file:", error);
      }
    } else {
      console.error("No file selected.");
    }
  };

  const handleDownload = async () => {
    try {
      // Send a request to the server to download the file
      const response = await fetch(`/api/download`, {
        method: "GET",
      });

      if (response.ok) {
        // Create a Blob from the response data
        const blob = await response.blob();

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = "output.mp3";

        // Trigger a click event to start the download
        link.click();

        // Clean up the temporary URL
        window.URL.revokeObjectURL(url);
      } else {
        console.error("File download failed.");
      }
    } catch (error) {
      console.error("An error occurred while downloading the file:", error);
    }
  };

  return (
    <>
      {/* filter */}
      {isComplete === ECompleteStage.process && (
        <div className="w-full h-full absolute bg-black opacity-70 flex justify-center items-center">
          <h1 className="text-white text-9xl animate-pulse">Loading</h1>
        </div>
      )}
      {/* Header */}
      <div className="w-auto h-[100px] bg-orange-400 shadow flex items-center">
        <p className="text-black text-[64px] font-normal font-['Sofia Sans'] ml-10">
          STTTS
        </p>
        <p className=" text-black text-[40px] font-normal font-['Sofia Sans'] mx-auto">
          make your life ez
        </p>
      </div>
      {/* lang section */}
      <div className="flex justify-center gap-[87px] mt-[81px]">
        <div className="text-orange-500 rounded-[50px] text-center border-2 border-orange-500 text-[40px] font-bold font-['Sofia Sans'] px-10 w-[220px] h-fit">
          {currentLanguage === "th-TH" ? "ไทย" : "English"}
        </div>
        {/* <div className=" bg-white rounded-[50px] border-2 border-orange-500">
          <p className=" text-center text-orange-500 text-[40px] font-bold font-['Sofia Sans'] ml-[71px]">
            {currentLanguage === "th-TH" ? "ไทย" : "English"}
          </p>
        </div> */}
        <div className="flex justify-center gap-[87px] mt-[81px]">
          <button
            className="text-orange-500 hover:text-white hover:bg-orange-500 rounded-[50px] text-center border-2 border-orange-500 text-[40px] font-bold font-['Sofia Sans'] px-10 w-[220px] h-fit"
            onClick={handleLanguageSwap}
          >
            SWAP
          </button>
          {/* <div
            className="w-[220px] h-[70px] bg-white rounded-[50px] border-2 border-orange-500 cursor-pointer"
            onClick={handleLanguageSwap}
          ></div>
          <div>eiei</div> */}
        </div>
        <div className="text-orange-500 rounded-[50px] text-center border-2 border-orange-500 text-[40px] font-bold font-['Sofia Sans'] px-10 w-[220px] h-fit">
          {currentLanguage === "th-TH" ? "English" : "ไทย"}
        </div>
        {/* <div className="w-[220px] h-[70px] bg-white rounded-[50px] border-2 border-orange-500">
          <p className="w-[78.32px] h-[34.12px] text-center text-orange-500 text-[40px] font-bold font-['Sofia Sans'] ml-[40px]">
            {currentLanguage === "th-TH" ? "English" : "ไทย"}
          </p>
        </div> */}
      </div>
      {/* content section */}
      <div className="flex">
        <div className="w-[538px] h-[50vh] bg-orange-50 p-4 rounded-[50px] ml-[148px] mt-[49px] pt-[28px]">
          <form
            action={() => {
              handleFileUpload();
              setIsComplete(ECompleteStage.process);
            }}
          >
            <div className="w-[170px] h-10 bg-orange-500 text-white hover:text-orange-500 hover:bg-white border-2 border-orange-500 rounded-[50px] py-[8px] ml-[41px] hover:cursor-pointer">
              <input
                type="submit"
                value="Upload files"
                className="ml-[25px] text-xl font-bold font-['Sofia Sans'] hover:cursor-pointer"
              />
            </div>
            <div className="mt-32 flex flex-col items-center gap-10">
              <input
                type="file"
                accept=".mp3"
                name="file"
                onChange={handleFileChange}
              />
              {isComplete === ECompleteStage.complete &&
                text.inputText !== "" && (
                  <>
                    <p>{text.inputText}</p>
                    <p
                      onClick={() => copy(text.inputText)}
                      className="mt-10 w-full text-right pr-4 hover:text-red-500 hover:cursor-pointer"
                    >
                      copy
                    </p>
                  </>
                )}
            </div>
          </form>
        </div>
        <div className="w-[538px] h-[50vh] bg-orange-50 p-4 rounded-[50px] mt-[49px] ml-[52px] pt-[27px]">
          <div
            className={`${
              isComplete === ECompleteStage.complete
                ? "p-2 w-fit transition"
                : "w-[50px] h-[50px]"
            } bg-orange-500 rounded-[50px] ml-[45px]`}
          >
            {isComplete === ECompleteStage.complete && (
              <audio controls>
                <source src={`/audio/output.mp3`} type="audio/mpeg" />
                {/* <source src={`/audio/${selectedFile?.name}`} type="audio/mpeg" /> */}
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
          {isComplete === ECompleteStage.complete &&
            text.translatedText !== "" && (
              <>
                <p className="ml-[70px] mt-[61px]">{text.translatedText}</p>
                <p
                  onClick={() => copy(text.translatedText)}
                  className="mt-10 w-full text-right pr-4 hover:text-red-500 hover:cursor-pointer"
                >
                  copy
                </p>
              </>
            )}
        </div>

        <div>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-full mt-4 hover:cursor-pointer"
            onClick={handleDownload}
          >
            Download MP3
          </button>
        </div>
      </div>
    </>
  );
}
