// app/articles/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { articles } from '../data/articles';
import ArticlesSection from '../components/Article';


interface PageProps {
  params: {
    id: string;
  };
}

export default function ArticleDetail({ params }: PageProps) {
  const article = articles.find((article:any) => article.id.toString() === params.id);

  if (!article) return notFound(); // better fallback than plain text

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-[55px] font-[800] mt-4 mb-6 text-center">
          {article.title} with {article.author}
        </h1>
        <Image
          src={article.Image}
          alt={article.title}
          className="rounded-lg w-full"
        />
      </div>

      <p className="text-lg text-gray-700 mb-8 w-[70%]">{article.history}</p>

      <div className="pr-10 my-8">
        <h2 className="text-[42px] font-[600]">{article.journey?.title}</h2>
        <p className="text-justify font-[400] mt-4 text-[18px]">
          {article.journey?.content}
        </p>
      </div>

      <div className="pr-10 my-8">
        <h2 className="text-[42px] font-[600]">{article.goals?.title}</h2>
        <p className="text-justify font-[400] mt-4 text-[18px]">
          {article.goals?.content}
        </p>
      </div>

      <div className="pr-10 my-8">
        <h2 className="text-[42px] font-[600]">{article.process?.title}</h2>
        <p className="text-justify font-[400] mt-4 text-[18px]">
          {article.process?.content}
        </p>
      </div>

      <div className="pr-10 my-8">
        <h2 className="text-[42px] font-[600]">{article.projects?.title}</h2>
        <p className="text-justify font-[400] mt-4 text-[18px]">
          {article.projects?.items[0].description}
        </p>
        <p className="text-justify font-[400] mt-4 text-[18px]">
          {article.projects?.items[0].details}
        </p>
      </div>

      <ArticlesSection />
    </div>
  );
}
