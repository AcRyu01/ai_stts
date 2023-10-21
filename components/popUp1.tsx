import badmood from "../app/pic/badmood.png";
import Image from "next/image";
import xcircle from "../app/pic/x-circle.png";

interface IPopUp1 {
  className?: string;
  clicked: () => void;
}

const PopUp1 = ({ className, clicked }: IPopUp1) => {
  return (
    <div className={className}>
      <div
        className={`w-[497px] h-[289px] bg-white rounded-[50px] border-4 border-orange-500 flex flex-col pt-[23px]`}
      >
        <div className="ml-[419px] relative">
          <Image
            src={xcircle}
            alt="xcircle"
            onClick={clicked}
            className="cursor-pointer"
          ></Image>
        </div>
        <div className="ml-[194px] mt-[-35px]">
          <Image src={badmood} alt="badmood"></Image>
        </div>
        <p className="text-[40px] font-bold font-['Sofia Sans'] ml-[180px]">
          Oops!
        </p>
        <p className="text-[26px]  font-bold font-['Sofia Sans'] ml-[40px]">
          Your file format isn&apos;t compatible.
        </p>
        <p className="text-[26px]  font-bold font-['Sofia Sans'] ml-[111px]">
          Make sure it&apos;s .mp3.
        </p>
      </div>
    </div>
  );
};

export default PopUp1;
