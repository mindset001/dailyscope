import React from "react";

export default function Hero() {
  return (
    <section className="spot-hero relative h-screen w-full">
     
      
      {/* Hero content */}
      <div className=" mx-auto h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-[45px] md:text-[100px] md:text-6xl font-[600] mb-4 text-center leading-20"> Spotlight</h1>
        <p className="text-[14px] md:text-[20px] font-[400] md:text-2xl mb-8 max-w-2xl text-center ">Celebrating creators, thinkers, and cultural innovators who are shaping our world through their art, vision, and dedication to their craft.</p>
       
      </div>
    </section>
  );
}