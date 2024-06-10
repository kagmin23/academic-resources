import { Button } from "antd";
// import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
export default function PaymentSuccess() {
  return (
    <div className='w-full my-8' >
        <div className='flex justify-center'>
        {/* <CheckCircleFilled className="text-green-700 text-8xl" /> */}
        {/* <Lottie animationData={image} className='w-36 h-36'  loop={false} />; */}
        </div>
        
        <div className='mt-4 text-xl italic font-bold text-center md:text-3xl'>Payment Successfull!</div>
        <div className='mt-8 text-lg font-bold text-center md:text-2xl'>1.250.000VNĐ</div>
        <div className='mt-4 text-lg italic font-bold text-center md:text-2xl'> 
           <div> The payment has been done successfully.</div>
           <div>Thank you for purchasing our courses.</div>
        </div>
        <div className='w-32 h-0.5 bg-black mx-auto mt-5'></div>
        <div className='w-full mx-auto mt-8 xl:w-2/6 lg:w-1/2'>
                <div className='flex justify-between mb-2 text-base text-gray-600 md:text-lg'>
                    <span>Customer Name:</span>
                    <span>TAT_610</span>
                </div>
                <div className='flex justify-between mb-2 text-base text-gray-600 md:text-lg'>
                     <span>Payment ID:</span>
                     <span>123456</span>
                </div>
                <div className='flex justify-between mb-2 text-base text-gray-600 md:text-lg'>
                     <span>Time:</span>
                     <span>15:03:10 10/6/2024</span>
                </div>
                <div>
                <Link to="/"> <Button type="primary" className='w-full mt-8 text-base font-bold bg-green-700 md:p-5 md:text-lg'>Back to Home</Button></Link>
                </div>

        

            
        </div>
    

        
    </div>
  );
}

