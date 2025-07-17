import React from "react";

export default function Hero() {
  return (
    <section className="about-hero relative h-screen w-full">
     
      
      {/* Hero content */}
      <div className=" mx-auto h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-[40px] md:text-[100px] md:text-6xl font-[600] mb-4 text-center md:leading-20"> About The  <br />Daily Scope</h1>
        <p className="text-[14px] md:text-[20px] font-[400] md:text-2xl mb-8 max-w-2xl text-center px-4 md:px-0">We are more than a publication—we are a movement dedicated to amplifying diverse voices in art, 
          culture, and creative discourse, fostering conversations that matter.</p>
       
      </div>
    </section>
  );
}