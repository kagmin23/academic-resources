import { CheckOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function CertificatePage(){
    return (
         <div className="ml-10">
            <h1 className="text-4xl mb-16 "> Course Name </h1>

         <div className="flex space-x-20">
           <div className="w-2/5 h-auto">
             <div className="w-full  p-10 flex bg-sky-100">
             <img className="rounded-full w-2/6" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4V8mLy_FcQOVcLmCMmwEqkIp64KxHm9QA2g&s"></img>
             <div className="ml-10">
             <h1 className="text-2xl font-bold  "> Completed by .....</h1>
             <p className="text-lg"> Time completed</p>
             <p className="text-lg"> Grade : 88,88 %</p>
             <p >This account is verified, Coursera certifies their successful completion of Introduction to HTML5</p>
             </div>
             </div>

             <div className="flex mt-5">
               <img className="w-1/4" src="https://images7.alphacoders.com/959/959382.png"></img>
               <div className="ml-3">
               <h2 className="text-lg underline decoration-3"> Course Name </h2>
               <p className="text-xs mb-3"> Intructor Name</p>
               <p className="underline decoration-3"> 560k student enrollded </p>
               </div>
             </div>

               <div className="border-gray-300 border-2 mt-10 p-5">
                <h2 className="text-xl ml-5 mb-5"> What you will learn </h2>
                <div className="grid ">
                    <h2  className="text-xl ml-5 mb-5"> <CheckOutlined className="text-green-600"/> Recognize and use common HTML5 tags. </h2>
                    <h2  className="text-xl ml-5 mb-5"> <CheckOutlined className="text-green-600"/>  Be aware of what an editor is and how to use one. </h2>
                    <h2  className="text-xl ml-5 mb-5"> <CheckOutlined className="text-green-600"/>  Compose HTML5 code that can create images and links. </h2>
                    
                    </div>
          


               </div>
               <div className="border-gray-300 border-2 p-5 flex-wrap">
               <h2 className="text-xl ml-5 mb-5"> Skills you will gain </h2>
                 <button disabled className="bg-slate-200 rounded-xl px-3 py-1 m-3" > WED Design</button>
                 <button disabled className="bg-slate-200 rounded-xl px-3 py-1 m-3" > Css</button>
                 <button disabled className="bg-slate-200 rounded-xl px-3 py-1 m-3" > Web Accessibility</button>
                 <button disabled className="bg-slate-200 rounded-xl px-3 py-1 m-3" > HTML</button>
                 <button disabled className="bg-slate-200 rounded-xl px-3 py-1 m-3" > HTML5</button>
               

               </div>
           </div>


           <div className="w-3/6  space-y-10">
             <img className="w-full h-auto border-4 border-gray-400" src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/31017973-e00a-491e-9dcd-44ab0649cef7/width=450/00950-239703450-_lora_nhk_misaki_lora_0_0.9_,%20nakahara%20misaki,%201girl,%20solo,%20short%20hair,%20black%20hair,%20brown%20eyes,%20black%20eyes%20_lora_nhk_misaki_lora.jpeg"></img>
             <button className="ml-10 text-xl text-blue-400 border-2 border-blue-400 rounded-md p-3 hover:bg-blue-600 hover:text-white"   > <DownloadOutlined/> Download Certificate </button>
           </div>
         </div>


         </div>
    )
}