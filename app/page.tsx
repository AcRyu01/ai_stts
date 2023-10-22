"use client";
import Image from "next/image";
import Logo from "../app/pic/STTTS.png";
import SwitchBut from "../app/pic/switch-horizontal.png";
import Upload from "../app/pic/cloud-upload.png";
import lock from "../app/pic/lock-open.png";
import user from "../app/pic/user-group.png";
import dup from "../app/pic/document-duplicate.png";
import dowload from "../app/pic/download.png";
import up from "../app/pic/up.png";
import dow from "../app/pic/dow.png";
import PopUp1 from "../components/popUp1";
// import PopUp2 from "../components/popUp2";
// import PopUp3 from "../components/popUp3";
import React, { useState, useRef } from "react";

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
  const hiddenFileInput = useRef<HTMLInputElement>(null);
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
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }

    if (selectedFile) {
      // upload file
      try {
        if (selectedFile.type !== "audio/mpeg") {
          setIsComplete(ECompleteStage.fileInvalid);
        } else {
          setIsComplete(ECompleteStage.process);
          const formData = new FormData();
          formData.append("file", selectedFile);
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            console.log(
              "File uploaded successfully. File path:",
              data.filePath
            );
          } else {
            const errorData = await response.json();
            console.error("File upload failed. Error:", errorData.error);
          }
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
      {isComplete === ECompleteStage.fileInvalid && (
        <>
          <PopUp1
            clicked={() => setIsComplete(ECompleteStage.wait)}
            className="fixed flex z-50 w-full h-full justify-center items-center"
          />
          <div className="w-full h-full fixed bg-black opacity-70 flex justify-center items-center"></div>
        </>
      )}
      {isComplete === ECompleteStage.process && (
        <div className="w-full h-full fixed bg-black opacity-70 flex justify-center items-center">
          <h1 className="text-white text-9xl animate-pulse">Loading</h1>
        </div>
      )}
      {/*header*/}
      <div className="w-auto h-[80px] bg-orange-500 flex justify-between pr-9 ">
        <Image src={Logo} alt="logo" width={250} height={75}></Image>
        <p className="text-2xl font-['Salsa'] text-white pt-10">
          “ Effortless translation starts with your upload. ”
        </p>
      </div>

      {/*content*/}

      {/*langeuage and Switch button*/}
      <div className="flex mt-[69px] mb-8">
        <div className="flex gap-x-[60px] text-[32px] font-semibold font-['Sofia Sans'] text-zinc-600 ml-[151px]">
          <p
            className={`${
              currentLanguage === "th-TH" && " text-orange-500 underline"
            }`}
          >
            Thai
          </p>
          <p
            className={`${
              currentLanguage === "en-US" && "text-orange-500 underline"
            }`}
          >
            English
          </p>
        </div>
        <button className="ml-[310px]" onClick={handleLanguageSwap}>
          <Image src={SwitchBut} alt="SwitchBut"></Image>
        </button>
        <div className="flex gap-x-[60px] text-[32px] font-semibold font-['Sofia Sans'] text-zinc-600 ml-[50px]">
          <p
            className={`${
              currentLanguage === "en-US" && "text-orange-500 underline"
            }`}
          >
            Thai
          </p>
          <p
            className={`${
              currentLanguage === "th-TH" && "text-orange-500 underline"
            }`}
          >
            English
          </p>
        </div>
      </div>

      {/*box box*/}
      <div className="flex  gap-x-[36px] justify-center">
        {/*gray box*/}
        <div className="w-[633px] min-h-[250px] p-10 bg-neutral-200 bg-opacity-90 rounded-[20px]">
          <form
            action={() => {
              handleFileUpload();
              // setIsComplete(ECompleteStage.process);
            }}
            className="h-full flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-10">
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
                  </>
                )}
            </div>
            {/* <div
              className={`w-full text-center text-[#7A7A7A] ${
                isComplete !== ECompleteStage.wait && "hidden"
              }`}
            >
              <p>no file choose</p>
            </div> */}
            <div className="flex justify-end items-center gap-8">
              <div className="w-[170px] h-10 flex justify-center items-center bg-orange-500 text-white hover:text-orange-500 hover:bg-white border-2 border-orange-500 rounded-[50px] py-[8px] hover:cursor-pointer">
                <input
                  type="submit"
                  value="Upload File"
                  className=" text-xl font-bold font-['Sofia Sans'] hover:cursor-pointer"
                />
              </div>
              <span
                className={`self-end opacity-50 cursor-default ${
                  isComplete === ECompleteStage.complete &&
                  text.inputText !== "" &&
                  "opacity-100 hover:cursor-pointer hover:animate-bounce"
                }`}
                onClick={() => copy(text.inputText)}
              >
                <Image src={dup} alt="dup"></Image>
              </span>
            </div>
          </form>
        </div>

        {/*orange box*/}
        <div className="w-[633px] min-h-[250px] p-10 bg-orange-50 rounded-[20px] flex flex-col justify-between gap-4">
          {isComplete === ECompleteStage.complete && (
            <audio controls>
              <source src={`/audio/output.mp3`} type="audio/mpeg" />
              {/* <source src={`/audio/${selectedFile?.name}`} type="audio/mpeg" /> */}
              Your browser does not support the audio element.
            </audio>
          )}
          {isComplete === ECompleteStage.complete &&
          text.translatedText !== "" ? (
            <p className="">{text.translatedText}</p>
          ) : (
            <div />
          )}
          <div className="self-end flex gap-4">
            <button
              className={`self-end opacity-50 cursor-default ${
                isComplete === ECompleteStage.complete &&
                text.inputText !== "" &&
                "opacity-100 hover:cursor-pointer "
              }`}
              onClick={handleDownload}
            >
              <Image src={dowload} alt="dowload"></Image>
            </button>
            <button
              className={`self-end opacity-50 cursor-default ${
                isComplete === ECompleteStage.complete &&
                text.inputText !== "" &&
                "opacity-100 hover:cursor-pointer hover:animate-bounce"
              }`}
              onClick={() => copy(text.translatedText)}
            >
              <Image src={dup} alt="dup"></Image>
            </button>
          </div>
        </div>
      </div>

      {/*rate*/}
      <div className="flex ml-[779px] mt-[10px] gap-6">
        <button>
          <Image src={up} alt="up"></Image>
        </button>
        <button>
          <Image src={dow} alt="dow"></Image>
        </button>
      </div>

      {/*footer*/}
      <div className="w-auto h-[535px] bg-orange-400 bg-opacity-60 mt-24 pt-[88px]">
        <div className="ml-[174px]">
          <div className="flex">
            <Image src={Upload} alt="upload"></Image>
            <div className="ml-[65px]">
              <p className="text-[32px] font-bold font-['Sofia Sans']">
                File Upload
              </p>
              <p>Uploaded files must be in .mp3 format.</p>
            </div>
          </div>
          <div className="mt-[85px] flex">
            <Image src={lock} alt="lock"></Image>
            <div className="ml-[65px]">
              <p className="text-[32px] font-bold font-['Sofia Sans']">
                Security
              </p>
              <p className="w-[886px]">
                You may be confident that our translation tool won&apos;t keep
                your files on our server longer than is necessary. When you exit
                the website, your data and results will be removed from our
                server.
              </p>
            </div>
          </div>
          <div className="mt-[76px] flex">
            <Image src={user} alt="user"></Image>
            <div className="ml-[65px]">
              <p className="text-[32px] font-bold font-['Sofia Sans']">
                User-Friendly
              </p>
              <p>
                Your audio files can be translated quickly and simply. You can
                just upload your file without downloading any software.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
