// app/articles/[id]/page.js
import React from 'react';
import Image from 'next/image';
interface ArticleDetailProps {
  params: {
    id: string;
  };
}

export default function Privacy() {
  
 

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-[55px] font-[800] mt-4 mb-6 text-center">Privacy & Policy</h1>
         <p className="text-lg text-gray-700 mb-8 w-[50%] text-center">In-depth analysis, cultural commentary, and thought-provoking essays on art, culture, and the creative forces shaping our world.</p>
      </div>
      
      
     
      <div className='pr-10 my-8'>
        <h2 className='text-[42px] font-[600]'>Tell us about Your Creative Journey as an Artist?</h2>
        <p className='text-justify font-[400] mt-4 text-[18px]'>Tega’s photography journey started without a camera. To have to shoot, Tega would borrow a camera from a friend just to fulfill his creative desires. A core memory of Tega's journey is going to a neighboring state; Ogun state, for a job of five thousand Nigerian naira, just so he could save up some money to get a camera for his journey towards photography. Doing these jobs for Tega was not just about the money. Sure, the money was a contributing factor, but Tega also wanted to build his portfolio. He needed people to see what he was capable of.
Making a name for himself in the photography industry was not an easy journey for Tega. Furthermore, having friends like GoalsbyVictor and his family also helped Tega's journey as a creative.
</p>
      </div>

      <div className='pr-10 my-8'>
        <h2 className='text-[42px] font-[600]'>What are Your Goals or Vision for your Work?</h2>
        <p className='text-justify font-[400] mt-4 text-[18px]'>I've always wanted to be an art director with the aim of having a creative house where I can create freely without restrictions while carving a specific identity for my brand.
"If challenges no dey the story no go sweet so keep your head up high "</p>
      </div>

      <div className='pr-10 my-8'>
        <h2 className='text-[42px] font-[600]'>What Is Your Creative Process Like?</h2>
        <p className='text-justify font-[400] mt-4 text-[18px]'>One consistent ritual of Tega's is listening to music before carrying out any shoot. Tega also tries to engage and converse properly with his client or model, whichever one, to make them understand his own part of the world and see what he's trying to achieve. Furthermore, Tega doesn't just edit because he has to. He has to be in the “mood” to edit, and more often than not, this “mood” comes at night.</p>
      </div>

      <div className='pr-10 my-8'>
        <h2 className='text-[42px] font-[600]'>What Are Your Top Three Projects?</h2>
        <p className='text-justify font-[400] mt-4 text-[18px]'>The Joy of The Brotherhood is a piece that shows the unity, strength and togetherness of men. Tega expresses that the inspiration behind this piece stemmed from the lack of love and celebration that men are denied of, despite everything they go through and their contributions to society. Tega has come to realize that men as creatures will sit back and not do or say anything about the lack of love and celebration they have and are still experiencing. The Joy Of the Brotherhood was exhibited at an exhibition called Meraki 2.0.</p>
       <p className='text-justify font-[400] mt-4 text-[18px]'>Another of such pieces is from the series Fluidity. The pieces in the series were done in so many categories, combining milk and water, but this particular piece is one of Tega's favourite in the series. He posits that this piece expresses resilience, strength and power.</p>
       <p className='text-justify font-[400] mt-4 text-[18px]'>Then the last one is titled Throned. <br />
It was after the creation of this piece that Tega realized the piece was created in a form or worship the people of Togo engaged in, in the 90s. The success behind Thorned was also as a result of Pere, Tega's friend, who had to cut his hair when the inspiration came to Tega, and served as a Muse for Tega. Thorned was also chosen at the +234 Art Fair.</p>
      </div>

     
    </div>
  );
}