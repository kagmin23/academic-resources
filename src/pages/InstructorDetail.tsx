import {
  BellOutlined,
  CalendarOutlined,
  GiftOutlined,
  MailOutlined,
  PhoneOutlined,
  SignatureOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Typography, message, notification } from 'antd';
import { Subcription } from 'models/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInstructorDetail } from 'services/All/getUserDetailApiService';
import { createOrUpdate, getItemBySubscriberInstructor } from 'services/All/subcriptionApiService';

export interface InstructorDetail {
  _id:		string,
  name:		string,
  email:		string,
  google_id:		string,
  role:		string,
  status:		boolean,
  description:		string,
  phone_number:		string,
  avatar:		string,
  video:		string,
  dob:		Date,
  is_verified:		boolean,
  balance_total:		number,
  balance_account:		string,
  balance_name:		string,
  transactions:		TransactionInstructorDetail[]
  created_at:		Date,
  updated_at:		Date,
  is_deleted:		boolean,
}

export interface TransactionInstructorDetail {
  _id:	string,
  payout_id:	string,
  payout_no:	string,
  payout_amount:	number,
  created_at:	Date,
}

const { Title, Text } = Typography;

export default function InstructorDetail() {
  const { userId } = useParams<{ userId: string }>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [currentInstructor, setCurrentInstructor] = useState<InstructorDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [subcriptionInstructor, setSubcriptionInstructor] = useState<Subcription[]>([]);
  const [filteredData, setFilteredData] = useState<Subcription[]>([]);

  useEffect(() => {
    const fetchInstructorData = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await getInstructorDetail(userId);
        if (response) {
          setSubcriptionInstructor(response);
          // await fetchSubscriptionStatus();
        } else {
          notification.error({
            message: 'Error',
            description: 'Guest',
          });
        }
      } catch (error: any) {
        notification.error({
          message: "Failed to fetch Instructor details!",
          description:
            error.message || "Failed to fetch Instructor details. Please try again.",
        });
      }
    };

    fetchInstructorData();
  }, [userId]);

  const handleSubscribe = async () => {
    if (!currentInstructor) return;
    setLoading(true);

    try {
        await createOrUpdate(currentInstructor._id);
        setIsSubscribed(isSubscribed);
        fetchSubscriptionStatus();
        message.success(isSubscribed ? 'Unsubscribed Successfully!' : 'Subscribed Successfully!');
    } catch (error: any) {
      notification.error({
        message: "Failed to Subscribe!",
        description:
          error.message || "Failed to Subscribe. Please try again.",
      });
    } finally {
        setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSubscriptionStatus();
}, []);

const fetchSubscriptionStatus = async () => {
    try {
        const response = await getItemBySubscriberInstructor(1, 10);
        console.log('Subscription Response:', response);

        if (response && response.length > 0 && response[0] && 'is_subscribed' in response[0]) {
            setIsSubscribed(response[0].is_subscribed);
        } else {
            console.error('Subscription status not found in response');
            setIsSubscribed(false);
        }
    } catch (error: any) {
      notification.error({
        message: "Failed to fetch Subscription Status!",
        description:
          error.message || "Failed to fetch Subscription Status. Please try again.",
      });
    }
};

  if (!currentInstructor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-white">Loading...</div>
      </div>
    );
  }
  
  const formattedCreatedAt = new Date(currentInstructor.created_at).toLocaleDateString('en-GB');
  const formattedDob = new Date(currentInstructor.dob).toLocaleDateString('en-GB');

  return (
    <div className='min-h-screen'>
      <div className='flex w-full px-5 pt-6 pb-4 min-h-56 bg-gradient-to-br from-gray-800 to-blue-900 h-fit'>
        <div className="flex justify-center w-1/5 ">
          <Avatar
            size={170}
            src={currentInstructor?.avatar || 'https://www.webiconio.com/_upload/255/image_255.svg'}
            className="border-4 border-white"
          />
        </div>
        <div className="w-3/5 ">
           <div className='flex'>
            <div className='text-[#82b3ff] font-semibold text-3xl mr-2'>
            Instructor:</div>
 
          <div className='text-3xl font-semibold text-white'> {currentInstructor?.name }</div>
          </div>
          <div className='flex mt-7'>
          <div className='w-1/2'>
          <div className=''>
          <MailOutlined style={{ marginRight: 8,fontSize: '20px' }} className="text-blue-500 " />
          <Text className="text-lg text-white ">Email: {currentInstructor.email}</Text>
          </div>
          <div className='mt-4'>
          <PhoneOutlined style={{ marginRight: 8,fontSize: '20px' }} className="text-blue-500 " />
          <Text className="text-lg text-white ">Phone Number: {currentInstructor.phone_number}</Text>
          </div>
          </div>
          <div>
          <div className=''>
          <GiftOutlined style={{ marginRight: 8,fontSize: '20px' }} className="text-blue-500 " />
          <Text className="text-lg text-white ">Date Of Birthday: {formattedDob}</Text>
          </div>
          <div className='mt-4'>
          <CalendarOutlined style={{ marginRight: 8,fontSize: '20px' }} className="text-blue-500 " />
          <Text className="text-lg text-white ">Joining Date: {formattedCreatedAt}</Text>
          </div>
          </div>
          </div>
          
        </div>
        <div className="flex justify-center w-1/6 my-auto">
        <Button
                                    onClick={handleSubscribe}
                                    type="primary"
                                    loading={loading}
                                    className={`mr-2 mt-2 p-1 text-sm font-semibold w-full bg-red-500`}
                                >
                                    {isSubscribed ? (
                                        <>
                                            <BellOutlined /> Subscribed
                                        </>
                                    ) : (
                                        'Subscribe'
                                    )}
                                </Button>
        </div>
      </div>
      <Card className='py-2 my-4'style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
      
       <div className='flex justify-between w-full px-14 '>
       
        <div className='w-1/2 '>
        <Text className='text-xl font-bold '><VideoCameraOutlined className="text-blue-500 " style={{ marginRight: 8,fontSize: '25px'}}/>Introductory Video: </Text>    
        <div className='mt-6 '>
            <div className='w-full '>
              <iframe 
                  width="100%" 
                  height="360" 
                  src={currentInstructor.video.replace('watch?v=', 'embed/')} 
                  title="Introductory Video" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
              </iframe>
            </div>        
          </div>
            
          </div>
          <div className='flex items-center'>

          <Divider style={{ backgroundColor: 'black', width: '1px', height:'100%' }} type="vertical" />
          </div>
        <div className=' w-[40%]'>
           <Text className='text-xl font-bold '><SignatureOutlined className="text-blue-500 " style={{ marginRight: 8,fontSize: '25px'}}/>Bio: </Text>

          <div className='mt-6'>
          <Text className="text-base font-medium text-black "> {currentInstructor.description} </Text></div>
        </div>
         
          </div>
          </Card>
          
      
    </div>
  );
}

