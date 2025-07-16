import React from 'react'

// components/AboutSection.tsx
export default function AboutSection() {
  return (
    <section className="bg-[#f9f9f9] py-20 text-center px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-black">
          About <span className="inline-block">The Daily Scope</span>
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
          We are a member-powered platform dedicated to amplifying diverse voices in art, culture, and creative discourse. Our mission is to foster meaningful conversations that bridge traditional and contemporary perspectives, creating a space where creativity meets critical thinking.
        </p>
        <button className="bg-white border border-black px-6 py-3 rounded-md font-semibold hover:bg-black hover:text-white transition-all">
          Learn more about us
        </button>
      </div>
    </section>
  );
}
