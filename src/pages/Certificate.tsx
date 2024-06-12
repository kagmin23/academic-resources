import { CheckOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
<meta name="viewport" content="width=device-width, initial-scale=1.0" />;

export default function CertificatePage() {
  return (
    /* <div className="ml-10">
            <h1 className="text-4xl mb-16 "> Course Name </h1>

         <div className="flex space-x-10">
           <div className="w-2/5 h-auto">
             <div className="w-full  p-10 flex bg-sky-100">
             <img className="rounded-full w-2/6" src="data:image/png;base64,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"></img>
             <div className="ml-10">
             <h1 className="text-2xl font-bold  "> Completed by .....</h1>
             <p className="text-lg"> Time completed</p>
             <p className="text-lg"> Grade : 88,88 %</p>
             <p >This account is verified, Coursera certifies their successful completion of Introduction to HTML5</p>
             </div>
             </div>

             <div className="flex mt-5">
               <img className="w-1/4" src=""></img>
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
             <img className="w-full h-auto border-4 border-gray-400" src="data:image/png;base64,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"></img>
             <button className="ml-10 text-xl text-blue-400 border-2 border-blue-400 rounded-md p-3 hover:bg-blue-600 hover:text-white"   > <DownloadOutlined/> Download Certificate </button>
           </div>
         </div>


         </div> */
    <div className="sm:ml-10">
      <h1 className="text-2xl mb-12 sm:text-4xl "> Course Name </h1>
      <div className="flex flex-col sm:flex-row-reverse ">
        <div className="mb-5 sm:ml-10 sm:w-1/2 ">
          <img
            className="h-auto w-full object-fill border-4 border-gray-400"
            src="https://hoppingfeet.com/wp-content/uploads/2018/11/IMG_E9541-1600x2133.jpg"
          ></img>
          <button className="ml-1 mt-2 sm:text-xl  text-blue-400 border-2 border-blue-400 rounded-md p-3 hover:bg-blue-600 hover:text-white">
            {" "}
            <DownloadOutlined /> Download Certificate{" "}
          </button>
        </div>

        <div className="sm:w-2/5">
          <div className="w-full p-5 sm:p-10 flex bg-sky-100">
            <img className="rounded-full w-1/6 h-2/5 sm:w-2/6" src="data:image/png;base64,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"></img>
            <div className="ml-6 space-y-1 sm:ml-10">
                <h1 className="text-xl font-bold sm:text-2xl"> Completed By ....</h1>
                <p className="sm:text-lg font-bold"> Time completed</p>
                <p className="text-lg font-bold"> Grade Achieved : 88,88 %</p>
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
                <h2 className="text-lg sm:text-xl ml-5 mb-5"> What you will learn: </h2>
                <div className="grid ">
                    <h2  className=" sm:text-xl ml-5 mb-2 sm:mb-5"> <CheckOutlined className="text-green-600"/> Recognize and use common HTML5 tags. </h2>
                    <h2  className=" sm:text-xl ml-5 mb-2 sm:mb-5"> <CheckOutlined className="text-green-600"/>  Be aware of what an editor is and how to use one. </h2>
                    <h2  className=" sm:text-xl ml-5 mb-2 sm:mb-5"> <CheckOutlined className="text-green-600"/>  Compose HTML5 code that can create images and links. </h2>
                    
                    </div>
               </div>
               <div className="border-gray-300 border-2 p-2 sm:p-5 flex-wrap">
               <h2 className=" text-lg sm:text-xl ml-5 mb-3 sm:mb-5"> Skills you will gain: </h2>
                 <button disabled className="bg-slate-200 rounded-xl px-3 py-1 m-3" > WED Design</button>
                 <button disabled className="bg-slate-200 rounded-xl px-3 py-1 m-3" > CSS</button>
                 <button disabled className="bg-slate-200 rounded-xl px-3 py-1 m-3" > Web Accessibility</button>
                 <button disabled className="bg-slate-200 rounded-xl px-3 py-1 m-3" > HTML</button>
                 <button disabled className="bg-slate-200 rounded-xl px-3 py-1 m-3" > HTML5</button>
               

               </div>


        </div>
      </div>
    </div>
  );
}
