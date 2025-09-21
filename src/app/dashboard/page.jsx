import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import NewCourse from "./newCourseButton";

export default function Dashboard() {
  return (
    <div className="w-full" >

      {/* Main Content */}
        <div className="flex p-6 items-center shadow-sm justify-between bg-gradient-to-l from-blue-600 via-blue-500 to-blue-800 w-full  ">
          <div className="text-4xl text-white text-shadow-2xs text-shadow-black font-extrabold">WELCOME TO DASHBOARD</div>
          <div className="scale-150"><UserButton  appearance={{
    elements: {
      userButtonAvatarBox: "shadow-black shadow-sm ring-2 ring-black",
    },
  }}/></div>
        </div>

        <div className="p-2">
        <NewCourse/>
       

        {/* Example Content */}
        <div className="flex-1 bg-gray-100 rounded-2xl  p-6">
          <p className="text-gray-700">
            This is your dashboard area. Add your main content here.
          </p>
        </div>
        </div>
      
    </div>
  );
}
