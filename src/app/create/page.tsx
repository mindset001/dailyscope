// components/SubscriptionPlans.js
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useRef, ChangeEvent } from 'react';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author name is required'),
  coverImages: z.any().optional(),

});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
      form.setValue('coverImages', e.target.files);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };
  return (
    <section className="bg-[#f9f9f9] pb-20 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8 flex flex-col items-center  ">
        <h1 className="text-[40px] md:text-[82px] font-[800] mt-4 mb-2 text-center px-2">Create an Article</h1>
        
      </div>
      
      {/* Billing cycle toggle */}
     

      {/* Plan card */}
      <div className='p-6 bg-white md:w-[60%]  flex flex-col justify-center   rounded-lg shadow-md'>
         <div className="  p-6">
      <h1 className="text-2xl font-bold mb-6 text-center ">Create new Article</h1>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Article Title */}
        <div className='flex flex-row gap-4 w-full '>
            <div className='w-full'>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Article title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter article title"
            {...form.register('title')}
            className="mt-1 block w-full rounded-md bg-[#F6F6F6] rounded-[11px] text-[12px] md:text-[16px] p-2  outline-none"
          />
          {form.formState.errors.title && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.title.message}</p>
          )}
        </div>
        <div className='w-full'>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Name of Author
          </label>
          <input
            id="author"
            type="text"
            placeholder="Enter author name"
            {...form.register('author')}
            className="mt-1 block w-full rounded-md bg-[#F6F6F6] rounded-[11px] text-[12px] md:text-[16px] p-2  outline-none"
          />
          {form.formState.errors.author && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.author.message}</p>
          )}
        </div>
        </div>

        {/* Article Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Write article
          </label>
          <textarea
            id="content"
            rows={10}
            placeholder="Enter article content"
            {...form.register('content')}
            className="mt-1 block w-full bg-[#F6F6F6] rounded-[11px]  p-2 "
          />
          {form.formState.errors.content && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.content.message}</p>
          )}
        </div>

        {/* Author Name */}
        

        {/* Image Upload */}
        <div className="">
          {/* <h3 className="text-lg font-medium text-gray-900 mb-4">Upload cover</h3> */}
          
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item, index) => (
               <div key={item} >
                  <span className="mt-2 block text-sm font-medium text-gray-700">
                          Upload Image {item}
                        </span>
              <div className="bg-[#F6F6F6] mt-2 border-gray-300 rounded-lg p-4 text-center ">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    multiple
                  />
                  <div className="flex flex-col items-center justify-center h-32">
                    {previews[index] ? (
                      <img 
                        src={previews[index]} 
                        alt={`Preview ${index}`}
                        className="h-full w-full object-cover rounded"
                      />
                    ) : (
                      <>
                        <svg
                          className="mx-auto md:h-12 md:w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                       <span className="mt-2 block text-[12px] md:text-sm font-medium text-gray-700">
                          Upload Image 
                        </span>
                      </>
                    )}
                  </div>
                </label>
              </div>
               </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-[#000000] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Publish Article
          </button>
        </div>
      </form>
    </div>
      </div>
     

      {/* Additional features could be added here
      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-2">✓ Access to all content</p>
        <p className="mb-2">✓ Exclusive member benefits</p>
        <p>✓ Support our creative community</p>
      </div> */}
    </section>
  );
}