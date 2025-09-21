"use client";
import { useContext, useEffect, useState } from "react";
import { GeminiObject } from "../useContext";

export default function Sidebar({ title, topic, chapters }) {
    const {
        geminiResponse,
        setGetminiResponse,
        geminiResponseArray,
        setGetminiResponseArray,
        geminiResultArray,
        setGetminiResultArray,
      } = useContext(GeminiObject);

  return (
    <nav className="sticky top-0 h-screen bg-gradient-to-b from-blue-100 via-white to-purple-200 p-6 text-black shadow-lg overflow-y-auto">
      <h2 className="text-2xl font-extrabold text-center text-purple-700 mb-4">
        {title}
      </h2>
      <p className="p-2 rounded-md bg-purple-800 text-center w-max text-white mb-6">{topic}</p>
      <div className="space-y-2">
        {geminiResultArray.map((chapter, index) => (
          <a
            key={index}
            href={`#chapter-${index}`}
            className="block px-3 py-2 shadow-md rounded-md hover:bg-blue-700 hover:text-white transition-colors font-bold"
          >
          📌 {chapter.chapterName}
          </a>
        ))}
      </div>
    </nav>
  );
}
