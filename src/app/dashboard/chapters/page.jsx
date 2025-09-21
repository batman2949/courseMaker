"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GeminiObject } from "@/app/useContext";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ChapterList() {
  const { geminiResponse, setGetminiResponse, geminiResponseArray, setGetminiResponseArray } = useContext(GeminiObject);
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: geminiResponse.title,
      topic: geminiResponse.topic,
      chapters: geminiResponseArray.map(ch => ({
        level: ch.level || "Beginner",
        name: ch.name || "",
        description: ch.description || ""
      }))
    }
  });



  useEffect(() => {
    if (Object.keys(geminiResponse).length > 0 && geminiResponseArray.length > 0) {
      setTimeout(() => alert("🎉 Course Chapter List created!"), 2000);
    } else {
      router.push("/dashboard/dashboardform");
    }
  }, [geminiResponse, geminiResponseArray]);

  const onSubmit = (data) => {
    setGetminiResponse(prev => ({
      ...prev,                // keep category, level, etc.
      title: data.title,
      topic: data.topic,
      chapters: data.chapters
    }));

    setGetminiResponseArray(data.chapters);

      // Save to localStorage
  localStorage.setItem("geminiResponse", JSON.stringify({
    title: data.title,
    topic: data.topic,
    chapters: data.chapters
  }));
    
    alert("Creating Course");
    router.push("/course");
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Course Maker</h1>
        <div className="scale-125"><UserButton /></div>
      </header>

      {/* Editable Course Info */}
      <section className="bg-white shadow-lg rounded-xl p-6 mb-8 border-l-8 border-purple-500">
        <input
          {...register("title")}
          className="text-3xl font-bold mb-3 w-full border-b-2 border-purple-400 focus:outline-none focus:border-purple-600 text-blue-700"
        />
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Topic: </span>
          <input
            {...register("topic")}
            className="border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 text-gray-900"
          />
        </div>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Level:</span> {geminiResponse.level}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Total Chapters:</span> {geminiResponse.totalChapters}
        </p>
      </section>

      {/* Chapters List */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {geminiResponseArray.map((chapter, index) => (
            <div key={index}>
              <div className="flex justify-end">
                <div className="text-white font-extrabold  bg-amber-600 p-2 rounded-t-md">
                  {chapter?.id ? chapter.id : `Chapter ${index + 1}`}
                </div>
              </div>
              <div className="bg-white text-black shadow-lg rounded-xl p-5 space-y-3 hover:shadow-2xl transition-shadow duration-300">
                {/* Editable Chapter Heading */}
                <input
                  {...register(`chapters.${index}.name`)}
                  className="text-xl font-semibold text-purple-700 w-full border-b border-gray-300 focus:outline-none focus:border-purple-500"
                />

                {/* Level Dropdown Button */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`font-bold px-3 py-1 rounded-md bg-green-600 text-white`}>{chapter.level}
                  </button>


                </div>

                {/* Editable Description */}
                <textarea
                  {...register(`chapters.${index}.description`)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Chapter description"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-8 py-3 cursor-pointer rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-colors"
          >
            Approved!! Create Course
          </button>
        </div>
      </form>

      <footer className="mt-16 text-center text-gray-500">
        © 2025 AI Course Maker
      </footer>
    </div>
  );
}
