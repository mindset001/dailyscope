import Image from "next/image";
import Navbar from "./components/Header";
import Footer from "./components/Footer";
import AboutSection from "./components/Home/About";
import ArticlesSection from "./components/Home/Article";
import Spotlight from "./components/Home/Spotlight";
import Hero from "./components/Home/Hero";

export default function Home() {
  return (
   <main >
    <div className="bg-[#f9f9f9] p-10 flex flex-col items-center gap-16">
      <Hero/>
    <Spotlight/>
    <ArticlesSection/>
    <AboutSection/>
    </div>
   </main>
  );
}
