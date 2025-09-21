'use client'
import { useRouter } from "next/navigation"


export default function NewCourse(){
    const router = useRouter();
    return(
        <div className="mt-9 flex justify-center">
             <div className="bg-purple-600 hover:bg-purple-800 font-semibold cursor-pointer size-max p-4 text-xl  text-white rounded-md" onClick={()=>{router.push("/dashboard/dashboardform")}}>Create a New AI Course</div>
        </div>
    )
}