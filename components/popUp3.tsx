import badmood from "../app/pic/badmood.png";
import Image from "next/image";
import xcircle from "../app/pic/x-circle.png";

const PopUp3 = () => {
  return (
    <>
      <div className="w-[566px] h-[289px] bg-white rounded-[50px] border-4 border-orange-500 flex flex-col pt-[33px]">
        <p className="text-[40px]  font-bold font-['Sofia Sans'] ml-[30px]">
          Do you want to download
        </p>
        <div className="flex gap-x-[44px] justify-center my-auto">
          <div className="w-[145px] h-16 bg-zinc-400 rounded-[50px] text-center text-white text-4xl font-bold font-['Sofia Sans'] pt-[12px]">
            no
          </div>
          <div className="w-[145px] h-16 bg-orange-500 rounded-[50px] text-center text-white text-4xl font-bold font-['Sofia Sans'] pt-[12px]">
            yes
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp3;
