import badmood from "../app/pic/badmood.png";
import Image from "next/image";
import xcircle from "../app/pic/x-circle.png";

const PopUp2 = () => {
  return (
    <>
      <div className="w-[497px] h-[289px] bg-white rounded-[50px] border-4 border-orange-500 flex flex-col pt-[23px]">
        <button className="ml-[419px] w-[45px] h-[45px]">
          <Image src={xcircle} alt="xcircle"></Image>
        </button>
        <div className="ml-[194px] mt-[-35px]">
          <Image src={badmood} alt="badmood"></Image>
        </div>
        <p className="text-[40px] font-bold font-['Sofia Sans'] ml-[180px]">
          Sorry!
        </p>
        <p className="text-[26px]  font-bold font-['Sofia Sans'] ml-[40px]">
          Please upload audio file that are
        </p>
        <p className="text-[26px]  font-bold font-['Sofia Sans'] ml-[65px]">
          no longer than 30 seconds.
        </p>
      </div>
    </>
  );
};

export default PopUp2;
