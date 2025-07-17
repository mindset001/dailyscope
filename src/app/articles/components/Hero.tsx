import React from "react";

export default function Hero() {
  return (
    <section className="art-hero relative h-screen w-full">
     
      
      {/* Hero content */}
      <div className=" mx-auto h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-[45px] md:text-[100px] md:text-6xl font-[600] mb-4 text-center leading-20"> Articles</h1>
        <p className="text-[14px] md:text-[20px] font-[400] md:text-2xl mb-8 max-w-2xl text-center px-10 md:px-0">In-depth analysis, cultural commentary, and thought-provoking essays on art, culture, and the creative forces shaping our world.</p>
       
      </div>
    </section>
  );
}