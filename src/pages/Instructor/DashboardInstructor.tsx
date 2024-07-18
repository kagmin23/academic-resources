
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
} from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Col, Row, Tabs, Typography, notification, Divider} from 'antd';
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/AdminsApi/UserService' // Adjust path as per your project structure
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import animation from '../../assets/111.json'
// const { TabPane } = Tabs;
const { Title, Text } = Typography;

const DashboardInstructor: React.FC = () => {
    
    const [currentUser, setCurrentUser] = useState<any>(null);
  

    useEffect(() => {
        const fetchCurrentUser = async () => {
          try {
            const response = await getCurrentUser(); // Replace with your API call
            if (response.success) {
              setCurrentUser(response.data);
            } else {
              notification.error({
                message: 'Error',
                description: 'Failed to fetch current user information',
              });
            }
          } catch (error) {
            notification.error({
              message: 'Error',
              description: 'Failed to fetch current user information',
            });
          }
        };
    
        fetchCurrentUser();
      }, []);
      


    if (!currentUser) {
        return <div>Loading...</div>;
    }
    const formattedDob = new Date(currentUser.dob).toLocaleDateString('en-GB');
    const formattedCreatedAt = new Date(currentUser.created_at).toLocaleDateString('en-GB');


    return (
        // <div className="text-white bg-[#D6E0FF] wrapper">
        <div className="text-white  wrappers ">
            {/* <div className='w-full h-56 bg-gradient-to-br from-blue-300  to-purple-200  '>
                <div className=' '>
                 <Lottie animationData={animation} className='w-[250px]'  loop={true} />;</div>
             <div className='absolute'>   
            <div className='text-white  text-center  text-3xl font-bold  '>Welcome to Academic Resource, {currentUser.name}</div>
            </div> 
            <div className="transform translate-y-1/4 flex justify-center"> 
                 <Avatar
                  size={160}
                  src={currentUser.avatar}
                  className="border-4 border-white "
                 />
            </div>
            <div className='flex justify-end'>
                
            </div>
            </div> */}
            <div className='w-full h-56 bg-gradient-to-br from-blue-300 to-purple-200 relative'>
                <div className='absolute -top-6 left-0 w-full h-full'>
                    <Lottie animationData={animation} className='w-[400px] h-[400px] m-auto' loop={true} />
                </div>
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <div className='text-white pt-14 text-center text-3xl font-bold'>
                        Welcome to Academic Resource, {currentUser.name}
                    </div>
                    <div className="transform translate-y-1/4 flex justify-center mt-3">
                        <Avatar
                            size={160}
                            src={currentUser.avatar}
                            className="border-4 border-white"
                        />
                    </div>
                </div>
            </div>
            <div className='mt-14 w-3/4  font-medium mx-auto'>
                
                <div className='flex justify-between'>
                    <div>
                        <div className="mb-5">
                             <MailOutlined style={{ marginRight: 8,fontSize: '20px' }} className=" text-blue-500" />
                             <Text className=" text-gray-700 text-lg">Email: {currentUser.email}</Text>
                        </div>  
                        <div className="mb-6">
                             < GiftOutlined style={{ marginRight: 8,fontSize: '20px' }} className=" text-blue-500" />
                             <Text className=" text-gray-700 text-lg">Date Of Birth:  {formattedDob}</Text>
                        </div>
                    </div>
                    
  
                    <div>
                         <div className="mb-5">
                                <PhoneOutlined style={{ marginRight: 8,fontSize: '20px' }} className=" text-blue-500" />
                                <Text className=" text-gray-700 text-lg">Phone Number: {currentUser.phone_number}</Text>
                          </div>
                          <div className="mb-6">
                                <CalendarOutlined style={{ marginRight: 8,fontSize: '20px' }} className=" text-blue-500" />
                                <Text className=" text-gray-700 text-lg">Joining Date: {formattedCreatedAt}</Text>
                          </div>
                    </div>
                    
                    </div>
                
                <div className=''>
                    <SignatureOutlined style={{ marginRight: 8,fontSize: '20px' }} className=" text-blue-500"/>
                    <Text className=" text-gray-700 text-lg">Bio: {currentUser.description} </Text>

                </div>
   

            

            </div>
            <Divider orientation="left"></Divider>
            <div className='w-3/4 mx-auto '>
                <Text className='text-xl font-bold'><VideoCameraOutlined className=" text-blue-500" style={{ marginRight: 8,fontSize: '25px'}}/>Introductory Video:</Text>
                <div className='mt-4 p-2'>
                <iframe 
                    width="100%" 
                    height="400" 
                    src={currentUser.video.replace('watch?v=', 'embed/')} 
                    title="Introductory Video" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe></div>
            </div>
            <div className='w-full my-7 flex justify-center'>
            <Link to="/instructor/profile-instructor/instructor-setting">
            <Button className='rounded-full bg-gradient-to-br from-blue-400 p-5  to-purple-300 text-lg text-white  w-full'><EditOutlined />Edit Profile</Button>
            </Link>
            </div>
           
       

            
           
        </div>
    );
};

export default DashboardInstructor;


