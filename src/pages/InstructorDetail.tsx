
import {
  CalendarOutlined,
  CaretRightOutlined,
  DislikeOutlined,
  EyeOutlined,
  GiftOutlined ,
  PhoneOutlined,
  SignatureOutlined,
  FacebookOutlined,
  LikeOutlined,
  LinkedinOutlined,
  MailOutlined,
  ManOutlined,
  ShareAltOutlined,
  WomanOutlined,
  YoutubeOutlined,
  VideoCameraOutlined,
  EditOutlined,
  BellOutlined,ReadOutlined 
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Avatar, Button, Typography, notification,Card, Divider } from 'antd';
import { getUserDetail } from 'services/All/getUserDetailApiService';
import { useParams } from 'react-router-dom';


const { Title, Text } = Typography;

export default function InstructorDetail() {
  const { userId } = useParams<{ userId: string }>();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState<any>(null);
 

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        // notification.error({
        //   message: 'Error',
        //   description: 'User ID is not available',
        // });
        return;
      }

      try {
        const response = await getUserDetail(userId);
        if (response.success) {
          setCurrentInstructor(response.data);
        } else {
          notification.error({
            message: 'Error',
            description: 'Guest',
          });
        }
      } catch (error) {
        // notification.error({
        //   message: 'Error',
        //   description: 'Failed to fetch current user information',
        // });
      }
    };

    fetchUserData();
  }, [userId]);
  if (!currentInstructor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }
  const formattedCreatedAt = new Date(currentInstructor.created_at).toLocaleDateString('en-GB');
  const formattedDob = new Date(currentInstructor.dob).toLocaleDateString('en-GB');
  return (
    <div className='min-h-screen'>
      <div className='w-full min-h-56 bg-gradient-to-br from-gray-800 to-blue-900 flex h-fit pt-6 pb-4 px-5'>
        
        <div className="w-1/5 flex justify-center ">
          <Avatar
            size={170}
            src={currentInstructor?.avatar || 'https://www.webiconio.com/_upload/255/image_255.svg'}
            className="border-4 border-white"
          />
        </div>
        <div className=" w-3/5">
           <div className='flex'>
            <div className='text-[#82b3ff] font-semibold text-3xl mr-2'>
            Instructor:</div>
 
          <div className='text-white text-3xl font-semibold'> {currentInstructor?.name }</div>
          </div>
          <div className='flex mt-7'>
          <div className='w-1/2'>
          <div className=''>
          <MailOutlined style={{ marginRight: 8,fontSize: '20px' }} className=" text-blue-500" />
          <Text className="text-white text-lg  ">Email: {currentInstructor.email}</Text>
          </div>
          <div className='mt-4'>
          <PhoneOutlined style={{ marginRight: 8,fontSize: '20px' }} className=" text-blue-500" />
          <Text className="text-white text-lg  ">Phone Number: {currentInstructor.phone_number}</Text>
          </div>
          </div>
          <div>
          <div className=''>
          <GiftOutlined style={{ marginRight: 8,fontSize: '20px' }} className=" text-blue-500" />
          <Text className=" text-white text-lg ">Date Of Birthday: {formattedDob}</Text>
          </div>
          <div className='mt-4'>
          <CalendarOutlined style={{ marginRight: 8,fontSize: '20px' }} className=" text-blue-500" />
          <Text className=" text-white text-lg ">Joining Date: {formattedCreatedAt}</Text>
          </div>
          </div>
          </div>
          
        </div>
        <div className="w-1/6 flex justify-center my-auto">
          <Button
            onClick={handleSubscribe}
            type="primary"
            className={` py-2 px-4 text-lg font-semibold ${isSubscribed ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ fontSize: '16px', height: 'auto' }}
          >
            <BellOutlined />{isSubscribed ? 'Unsubscribe' : 'Subscribe'}
          </Button>
        </div>
      </div>
      <Card className='my-4 py-2'style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
      
       <div className='w-full px-14 flex justify-between '>
       
        <div className='w-1/2 '>
        <Text className='text-xl font-bold '><VideoCameraOutlined className=" text-blue-500" style={{ marginRight: 8,fontSize: '25px'}}/>Introductory Video: </Text>    
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
           <Text className='text-xl font-bold '><SignatureOutlined className=" text-blue-500" style={{ marginRight: 8,fontSize: '25px'}}/>Bio: </Text>

          <div className='mt-6'>
          <Text className=" text-black text-base font-medium "> {currentInstructor.description} </Text></div>
        </div>
         
          </div>
          </Card>
          
      
    </div>
  );
}

