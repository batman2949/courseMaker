import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function SecondNavbar(){
    return(
         <div className="flex sticky top-0 z-50 items-center justify-end gap-8 bg-white p-2 shadow-md">
          <Link
            href="/dashboard"
            className="px-4 py-2 select-none cursor-pointer bg-blue-500 hover:bg-blue-700 text-white rounded"
          >
            Home
          </Link>

          <Link
            href="/dashboard/dashboardform"
            className="px-4 py-2 bg-purple-500 hover:bg-purple-700 text-white select-none cursor-pointer rounded"
          >
            Create New Course
          </Link>

          <div className="scale-125">
            <UserButton />
          </div>
        </div>
    )
}