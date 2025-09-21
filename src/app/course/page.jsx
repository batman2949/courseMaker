"use client";
import { useContext, useEffect, useState } from "react";
import { GeminiObject } from "../useContext";
import Sidebar from "./sidebar";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import YouTubeVideo from "./youtubeapi";
import { SecondNavbar } from "./secondNavbar";

export default function Courses() {
  const {
    geminiResponse,
    setGetminiResponse,
    geminiResponseArray,
    setGetminiResponseArray,
    geminiResultArray,
    setGetminiResultArray,
  } = useContext(GeminiObject);

  const [loading, setLoading] = useState();
  const [localChapters, setLocalChapters] = useState([]);
   const [initialized, setInitialized] = useState(false);

  const[currentQuestion, setCurrentQuestion] = useState([]);
  
  const router = useRouter();

  // Load saved course from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("geminiResponse");
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setGetminiResponse(parsed);
        setGetminiResponseArray(parsed.chapters);
        setLocalChapters(parsed.chapters);
      }
    }
     setInitialized(true); // mark as initialized
  }, []);

  // Generate chapters
  useEffect(() => {
    setLoading(true);

    if (!initialized) return;

    if (!localChapters || localChapters.length === 0) {
      router.push("/dashboard/dashboardform");
      return;
    }

    setGetminiResultArray([]); // clear previous results

    async function generateChapters() {
      for (let i = 0; i < geminiResponseArray.length; i++) {
        try {
          const response = await fetch(
            "https://coursemakerbackend.onrender.com/gemini/geminiChapters",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                data: geminiResponseArray[i],
                title: geminiResponse.title,
                topic: geminiResponse.topic,
              }),
            }
          );
          const data = await response.json();
          const cleanedText = data.chapter.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleanedText);
          console.log(parsed);
          setGetminiResultArray((prev) => [...prev, parsed]);
        } catch (err) {
          console.error("Error generating chapter", i + 1, err);
        }
      }
      setLoading(false);
    }

    generateChapters();
  }, [initialized, localChapters, geminiResponse]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 border-solid"></div>
      <div className="text-blue-600 font-extrabold text-4xl mt-9">Please Wait. This will take time...</div>
    </div>
    );
  }

  return (
    <div className="flex justify-start min-h-screen  max-w-screen bg-gray-50">
      {/* Sidebar / Navbar */}
      <Sidebar 
       title={geminiResponse.title}
        topic={geminiResponse.topic}
        chapters={geminiResultArray}
        className="w-1/12"/>

      {/* Main Content */}
      <div className=" bg-white space-y-10 w-11/12">
      <SecondNavbar/>
        {geminiResultArray.map((chapter, index) => (
          <section key={index} id={`chapter-${index}`} className="bg-white rounded-lg shadow-md p-6">
            <h1 className="font-extrabold text-4xl underline mb-3 text-center text-blue-700">Chapter {index+1}</h1>
            <h3 className="text-3xl text-center underline font-extrabold text-purple-700 mb-9">{chapter.chapterName}</h3>
            <p className=" rounded-md text-center bg-gradient-to-tr from-purple-500 to-blue-400 text-white text-xl p-2 mb-4">{chapter.summary}</p>

            <div><YouTubeVideo query={chapter.chapterName}/></div>

            {chapter.content?.map((c, i) => (
              <div key={i} className="mb-8">
                <h4 className="font-semibold text-2xl text-blue-700 mb-1">{c.heading}</h4>
                {c.text.map((element, index)=>(
                  <ReactMarkdown className="text-black font-semibold mb-2" key={index}>{element
                  }</ReactMarkdown>
                ))}
                
                {c.code && (
                  <div>
                  <pre className="p-3 text-green-300  rounded  bg-black overflow-x-auto">
                    <code className="font-extrabold">{c.code}</code>
                  </pre>
                  {c.codeExplanation && 
                  c.codeExplanation.map((element, index)=>(
                    <div key={index}>
                    <ReactMarkdown className=" bg-purple-200 text-black p-2">{element}</ReactMarkdown>
                    </div>
                  ))}
                  </div>
                )}
              </div>
            ))}

            {chapter.images?.map((img, i) => (
              <img
                key={i}
                src={`https://via.placeholder.com/600x300?text=${encodeURIComponent(img.alt)}`}
                alt={img.alt}
                className="rounded-lg shadow-md mb-4"
              />
            ))}

            {chapter.quiz?.length > 0 && (
              <div className="mt-4 p-4 border-l-4 border-purple-500 bg-purple-50 rounded">
                <h4 className="font-bold text-purple-700 text-3xl mb-2">Quiz</h4>
                {chapter.quiz.map((q, i) => (
                  <div key={i} className="mb-5">
                    <p className="text-black font-bold">{i + 1}. {q.question}</p>
                    <ul className="list-disc list-inside text-gray-700">
                      {q.options.map((opt, idx) => (
                        <li key={idx} className="text-black">
                          {opt}
                        </li>
                      ))}
                    </ul>
                    <div onClick={()=>{    // Update the state by creating a copy and setting this specific question as "opened"
    setCurrentQuestion((prev) => ({
      ...prev,
      [index + i]: i, // store i at key (index+i)
    }));}} className={`${currentQuestion[index+i] === i ? "text-purple-500 font-bold" : "bg-yellow-500 text-transparent cursor-pointer"} transition-all duration-700`}>Correct Answer: {q.correctAnswer}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
