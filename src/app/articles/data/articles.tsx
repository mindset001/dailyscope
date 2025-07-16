// data/articles.js
import One from '@/../public/images/article2.png';
import Two from '@/../public/images/image (1).png';
import Three from '@/../public/images/article1.png';

export const articles = [
  {
    id: 1,
    category: 'Design',
    title: 'The Renaissance of African Design Thinking',
    description: 'How contemporary African designers are reshaping global creatives discourse through indigenous methodologies and modern innovation',
    author: 'Chioma Nnadi',
    readTime: '8 min read',
    history: 'Oghenetega, Jonathan Ojovbo is a visual artist and a photographer who hails from Ughelli, Delta state, but currently resides in Lagos state. Tega has recently participated in an exhibition in Ecobank, with +234 Art Fair.',
    Image: Two,
    // Add full content here
    content: 'Full article content goes here...',
    journey: {
      title: "Tell us about Your Creative Journey as an Artist?",
      content: [
        "Tego's photography journey started without a camera. To have to shoot, Tego would borrow a camera from a friend just to fulfill its creative desires.",
        "A core memory of Tego's journey is going to a neighboring state; Ogun state, for a job of five thousand Nigerian men, just so he could save up some money to get a camera for his journey towards photography.",
        "Doing these jobs for Tego was not just about the money. Sure, the money was a contributing factor, but Tego also wanted to build his portfolio. He needed people to see what he was capable of.",
        "Noting a name for himself in the photography industry was not an easy journey for Tega. Furthermore, having friends like GodsayVictor and his family also helped Tego's journey as a creative."
      ]
    },
    goals: {
      title: "What are Your Goals or Vision for your Work?",
      content: [
        "I've always wanted to be an art director with the aim of having a creative house where I can create freely without restrictions while coming a specific identity for my brand.",
        "'If challenges no day the story no go sweet so keep your head up high.'"
      ]
    },
    process: {
      title: "What Is Your Creative Process Like?",
      content: [
        "One consistent ritual of Tego's is listening to music before carrying out any shoot.",
        "Tego also tries to engage and converse properly with his client or model, whichever one, to make them understand his own part of the world and see what he's trying to achieve.",
        "Furthermore, Tego doesn't just edit because he has to. He has to be in the 'mood' to edit, and more often than not, this 'mood' comes at night."
      ]
    },
    projects: {
      title: "What Are Your Top Three Projects?",
      items: [
        {
          title: "The Joy of The Brotherhood",
          description: "A piece that shows the unity, strength and togetherness of men. Tego expresses that the inspiration behind this piece stemmed from the lack of love and celebration that men are denied of, despite everything they go through and their contributions to society.",
          details: [
            "Tego has come to realise that men as creatures will sit back and not do or say anything about the lack of love and celebration they have and are still experiencing.",
            "The Joy of the Brotherhood was exhibited at an exhibition called Mental 3."
          ]
        },
        {
          title: "Fluidity Series",
          description: "The pieces in the series were done in so many categories, combining milk and water, but this particular piece is one of Tego's favourite in the series.",
          details: [
            "He posits that this piece expresses resilience, strength and power."
          ]
        },
        {
          title: "Thromed",
          description: "It was after the creation of this piece that Tego realized the piece was created in a form or worship the people of Tego engaged in.",
          details: [
            "In the '90s, The success behind Thromed was also as a result of Pere, Tego's friend, who had to cut his hair when the inspiration came to Tego, and served as a Muse for Tego.",
            "Thromed was also chosen at the +234 Art Fair."
          ]
        }
      ]
    },
    socialLinks: {
      instagram: "#",
      twitter: "#",
      website: "#"
    }
  },
  {
    id: 2,
    category: 'Design',
    title: 'The Renaissance of African Design Thinking',
    description: 'How contemporary African designers are reshaping global creatives discourse through indigenous methodologies and modern innovation',
    author: 'Chioma Nnadi',
    readTime: '8 min read',
    Image: One,
    content: 'Full article content goes here...'
  },
  {
    id: 3,
    category: 'Design',
    title: 'The Renaissance of African Design Thinking',
    description: 'How contemporary African designers are reshaping global creatives discourse through indigenous methodologies and modern innovation',
    author: 'Chioma Nnadi',
    readTime: '8 min read',
    Image: Three,
    content: 'Full article content goes here...'
  },
];