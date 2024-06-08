import React from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { Button } from "antd";
export default function PaymentSuccess() {
  return (
    <div className='my-12 w-full' >
        <div className='flex justify-center'>
        <CheckCircleFilled className="text-green-700 text-8xl" />
        </div>
        
        <div className='mt-8 text-3xl italic font-bold text-center'>Payment Successfull!</div>
        <div className='mt-8 text-2xl font-bold text-center'>1.250.000VNĐ</div>
        <div className='mt-4 text-2xl font-bold text-center italic'> 
           <div> The payment has been done successfully.</div>
           <div>Thank you for purchasing our courses.</div>
        </div>
        <div className='w-32 h-0.5 bg-black mx-auto mt-5'></div>
        <div className='w-2/6 mx-auto mt-8'>
                <div className='flex justify-between mb-2 text-lg text-gray-600'>
                    <span>Customer Name:</span>
                    <span>TAT_610</span>
                </div>
                <div className='flex justify-between mb-2 text-lg text-gray-600'>
                     <span>Payment ID:</span>
                     <span>123456</span>
                </div>
                <div className='flex justify-between mb-2 text-lg text-gray-600'>
                     <span>Time:</span>
                     <span>15:03:10 10/6/2024</span>
                </div>
                <div>
                    <Button type="primary" className='w-full mt-8 bg-green-700 p-5 font-bold text-lg'>Back to Home</Button>
                </div>

        

            
        </div>
    

        
    </div>
  );
}

