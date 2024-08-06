import { Button } from "antd";
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
import image from '../assets/payment2.json';
export default function PaymentSuccess() {
  return (
    <div className='w-full my-8' >
        <div className='flex justify-center'>
        {/* <CheckCircleFilled className="text-green-700 text-8xl" /> */}
        <Lottie animationData={image} className='w-36 h-36'  loop={false} />;
        </div>
        
        <div className='mt-4 text-xl italic font-bold text-center md:text-3xl'>Payment Successfull!</div>
                <div className="flex flex-col items-center justify-center text-center">
                <img className="mt-5 w-96 h-w-96" src="https://static.vecteezy.com/system/resources/previews/021/730/260/non_2x/thank-you-for-your-purchase-printable-illustration-business-thank-you-customer-card-creative-graphic-design-template-soft-watercolor-background-calligraphy-script-text-business-card-free-vector.jpg" alt="image success payment" />
                <Link to={`manager-your-purchases`}><Button type="primary" className='w-auto mt-8 text-base font-bold bg-green-700 md:p-5 md:text-lg'>Come to your Orders</Button></Link>
                </div>
        </div>
  );
}

