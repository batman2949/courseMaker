"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router= useRouter();
  const handleClick = () => {
    alert("Get Started clicked! 🚀");
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gradient-to-b from-blue-50 to-white  font-sans">
      {/* Navbar */} 
      <nav className="flex w-full  justify-between items-center md:py-4 py-3 px-6 bg-white/70 backdrop-blur-lg shadow-md rounded-2xl">
        <img src={"https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png"} className="rounded-xl shadow-md size-12 cursor-pointer"/>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700  text-white rounded-xl shadow-lg px-6 py-2 text-lg font-semibold"
        >
          Get Started
        </motion.button>
      </nav>

      {/* Main Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-20 text-center max-w-2xl bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold text-blue-700 mb-4"
        >
          AI Course Generator
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl font-semibold text-gray-800 mb-3"
        >
          Custom Learning Paths, Powered by AI
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          Unlock personalized education with AI-driven course creation. Tailor your learning
          journey to fit your unique goals and pace.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90 text-white text-lg font-bold px-10 py-4 cursor-pointer rounded-2xl shadow-xl"
        >
          GET STARTED
        </motion.button>
      </motion.section>
    </div>
  );
}
