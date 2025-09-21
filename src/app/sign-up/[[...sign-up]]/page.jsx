"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="shadow-2xl rounded-3xl  flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">
        {/* Left Side - Image */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-yellow-400 to-black p-8">
          <img
            src="https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png"
            alt="AI Illustration"
            className="rounded-2xl shadow-lg max-h-80 object-contain"
          />
        </div>

        {/* Right Side - Sign Up */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
            Join Us Today
          </h1>

          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-xl text-white rounded-xl shadow-md text-base font-semibold transition-all",
                formFieldInput:
                  "border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none",
                card: "shadow-md shadow-green-400",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
