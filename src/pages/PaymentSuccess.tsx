import { Button } from 'antd';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import image from '../assets/payment2.json';

const PaymentSuccess: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-center bg-cover'
      style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/021/730/260/non_2x/thank-you-for-your-purchase-printable-illustration-business-thank-you-customer-card-creative-graphic-design-template-soft-watercolor-background-calligraphy-script-text-business-card-free-vector.jpg)' }}>
      
      <div className="flex flex-col items-center gap-10 mb-32">
      <div className='flex justify-center mb-4'>
        <Lottie animationData={image} className='w-48 h-48' loop={false} />
      </div>
      
      <div className="flex flex-col items-center gap-1">
      <div className='mt-64 text-sm italic font-bold text-black md:text-xl'>Payment Successful!</div>
        <p className="italic">"Thank you for your purchase. Your transaction has been completed."</p>
          <Link key="orders" to={`manager-your-purchases`}>
            <Button
              type="primary"
              className='mt-5 text-sm font-bold bg-green-700 hover:bg-green-800'
              size="large"
            >
              View Your Orders
            </Button>
          </Link>
          </div>
        </div>
    </div>
  );
};

export default PaymentSuccess;
