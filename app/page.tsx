// import Image from "next/image";
"use client";
import React, { useState } from "react";

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState("th"); // Default language
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    // Get the selected file from the input field
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleLanguageSwap = () => {
    // Function to toggle between Thai ("th") and English ("en")
    setCurrentLanguage(currentLanguage === "th" ? "en" : "th");
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      // Now you can use the selectedFile for your file upload logic
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
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
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <>
      <div className="w-auto h-[100px] bg-orange-400 shadow flex">
        <p className="w-[247px] h-[59px] text-black text-[64px] font-normal font-['Sofia Sans'] ml-[40px]">
          STTTS
        </p>
        <p className="w-[433px] h-[115px] text-black text-[40px] font-normal font-['Sofia Sans'] mx-auto mt-[23px]">
          make your life ez
        </p>
      </div>

      <div className="flex justify-center gap-[87px] mt-[81px]">
        <div className="w-[220px] h-[70px] bg-white rounded-[50px] border-2 border-orange-500">
          <p className="w-[78.32px] h-[34.12px] text-center text-orange-500 text-[40px] font-bold font-['Sofia Sans'] ml-[71px]">
            {currentLanguage === "th" ? "ไทย" : "English"}
          </p>
        </div>
        <div className="flex justify-center gap-[87px] mt-[81px]">
          <div
            className="w-[220px] h-[70px] bg-white rounded-[50px] border-2 border-orange-500 cursor-pointer"
            onClick={handleLanguageSwap}
          ></div>
          <div>eiei</div>
        </div>
        <div className="w-[220px] h-[70px] bg-white rounded-[50px] border-2 border-orange-500">
          <p className="w-[78.32px] h-[34.12px] text-center text-orange-500 text-[40px] font-bold font-['Sofia Sans'] ml-[40px]">
            {currentLanguage === "th" ? "English" : "ไทย"}
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="w-[538px] h-[625px] bg-orange-50 rounded-[50px] ml-[148px] mt-[49px] pt-[28px]">
          <form action={handleFileUpload}>
            <div className="w-[170px] h-10 bg-orange-500 rounded-[50px] py-[8px] ml-[41px] hover:cursor-pointer">
              <input
                type="submit"
                value="Upload files"
                className="ml-[25px]  text-white text-xl font-bold font-['Sofia Sans'] hover:cursor-pointer"
              />
            </div>
            <div className="mt-[300px] mx-[195px]">
              <input
                type="file"
                accept=".mp3"
                name="file"
                onChange={handleFileChange}
              />
            </div>
          </form>
        </div>
        <div className="w-[538px] h-[1101px] bg-orange-50 rounded-[50px] mt-[49px] ml-[52px] pt-[27px]">
          <div className="w-[50px] h-[50px] bg-orange-500 rounded-[50px] ml-[45px]">
            <audio controls>
              <source src="/audio/6.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <p className="ml-[70px] mt-[61px]"> eieieieiieieieieieieieiie </p>
        </div>
      </div>
    </>
  );
}
