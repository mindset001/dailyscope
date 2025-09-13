import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="home-hero relative h-screen w-full">
     
      
      {/* Hero content */}
      <div className=" mx-auto h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-[40px] md:text-[100px] font-[600] mb-4 text-center md:leading-20">Culture. Art. <br />Commentary.</h1>
        <p className="px-4 md:px-0 text-[14px] md:text-[18px] font-[400] md:text-2xl mb-8 max-w-2xl text-center">Where creative minds converge to explore the intersection of art, culture, and contemporary discourse. Start Reading</p>
        <div className="flex flex-col md:flex-row  gap-4">
         <Link href="/articles">
            <button className="bg-[#FFFFFF] cursor-pointer font-[500] text-[#000] hover:bg-black hover:text-white px-8 py-3 rounded-lg text-[14px] md:text-[18px] font-medium">
          Start Reading
        </button>
         </Link>
        <Link href="/dashboard/subscription" className="">
        <button className="bg-[#FFFFFF] cursor-pointer font-[500] text-[#000] hover:bg-black hover:text-white px-8 py-3 rounded-lg text-[14px] md:text-[18px] font-medium">
         
           Become a Member
     
        </button>
            </Link>
        </div>
      </div>
    </section>
  );
}