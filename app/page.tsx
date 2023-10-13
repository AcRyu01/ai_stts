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

export default function Home() {
  return (
    <>
      {/*header*/}
      <div className="w-auto h-[80px] bg-orange-500 flex justify-between pr-9 ">
        <Image src={Logo} alt="logo" width={250} height={75}></Image>
        <p className="text-2xl font-['Salsa'] text-white pt-10">
          “ Effortless translation starts with your upload. ”
        </p>
      </div>

      {/*content*/}

      {/*langeuage and Switch button*/}
      <div className="flex mt-[69px]">
        <div className="flex gap-x-[60px] text-[32px] font-semibold font-['Sofia Sans'] text-zinc-600 ml-[151px]">
          <p>thai</p>
          <p>english</p>
        </div>
        <button className="ml-[310px]">
          <Image src={SwitchBut} alt="SwitchBut"></Image>
        </button>
        <div className="flex gap-x-[60px] text-[32px] font-semibold font-['Sofia Sans'] text-zinc-600 ml-[50px]">
          <p>thai</p>
          <p>english</p>
        </div>
      </div>

      {/*box box*/}
      <div className="flex  gap-x-[36px] justify-center">
        {/*gray box*/}
        <div className="w-[633px] h-[625px] bg-neutral-200 bg-opacity-90 rounded-[20px]">
          <button className="w-[170px] h-[40px] bg-orange-500 rounded-[50px] mt-[20px] ml-[25px] text-white">
            Upload
          </button>
          <button className=" mt-[520px] ml-[568px]">
            <Image src={dup} alt="dup"></Image>
          </button>
        </div>

        {/*orange box*/}
        <div className="w-[633px] h-[625px] bg-orange-50 rounded-[20px]">
          <button className=" mt-[580px] ml-[524px]">
            <Image src={dowload} alt="dowload"></Image>
          </button>
          <button className="ml-[12px]">
            <Image src={dup} alt="dup"></Image>
          </button>
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
      <div className="w-auto h-[535px] bg-orange-400 bg-opacity-60 mt-[731px] pt-[88px]">
        <div className="ml-[174px]">
          <div className="flex">
            <Image src={Upload} alt="upload"></Image>
            <div className="ml-[65px]">
              <p className="text-[32px] font-bold font-['Sofia Sans']">
                File Upload
              </p>
              <p>
                Uploaded files must be in .mp3 format and must not exceed 30
                seconds in length
              </p>
            </div>
          </div>
          <div className="mt-[85px] flex">
            <Image src={lock} alt="lock"></Image>
            <div className="ml-[65px]">
              <p className="text-[32px] font-bold font-['Sofia Sans']">
                Security
              </p>
              <p className="w-[886px]">
                You may be confident that our translation tool won't keep your
                files on our server longer than is necessary. When you exit the
                website, your data and results will be removed from our server.
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
