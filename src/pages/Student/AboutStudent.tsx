
import {
  CalendarOutlined,
  EditOutlined,
  GiftOutlined,
  MailOutlined,
  PhoneOutlined,
  SignatureOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Avatar, Button, Divider, Typography, notification } from 'antd';
import Lottie from "lottie-react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import animation from '../../assets/111.json';
import { getCurrentUser } from '../../services/AdminsApi/UserService';
const { Title, Text } = Typography;

const AboutStudent: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);


  useEffect(() => {
      const fetchCurrentUser = async () => {
        try {
          const response = await getCurrentUser();
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
  const handleEdit = (userId: string) => {
    
    navigate(`/student/profile-student/info-student/${userId}`);
   
  };


  return (
      <div className="text-white wrappers ">
          <div className='relative w-full h-56 bg-gradient-to-br from-blue-300 to-purple-200'>
              <div className='absolute left-0 w-full h-full -top-6'>
                  <Lottie animationData={animation} className='w-[400px] h-[400px] m-auto' loop={true} />
              </div>
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                  <div className='text-3xl font-bold text-center text-white pt-14'>
                      Welcome to Academic Resource, {currentUser.name}
                  </div>
                  <div className="flex justify-center mt-3 transform translate-y-1/4">
                      <Avatar
                          size={160}
                          src={currentUser.avatar}
                          className="border-4 border-white"
                      />
                  </div>
              </div>
          </div>
          <div className='w-3/4 mx-auto font-medium mt-14'>
              
              <div className='flex justify-between'>
                  <div>
                      <div className="mb-5">
                           <MailOutlined style={{ marginRight: 8,fontSize: '20px' }} className="text-blue-500 " />
                           <Text className="text-lg text-gray-700 ">Email: {currentUser.email}</Text>
                      </div>
                      <div className="mb-6">
                           < GiftOutlined style={{ marginRight: 8,fontSize: '20px' }} className="text-blue-500 " />
                           <Text className="text-lg text-gray-700 ">Date Of Birth:  {formattedDob || "update"}</Text>
                      </div>
                  </div>
                  <div>
                       <div className="mb-5">
                              <PhoneOutlined style={{ marginRight: 8,fontSize: '20px' }} className="text-blue-500 " />
                              <Text className="text-lg text-gray-700 ">Phone Number: {currentUser.phone_number || "update"}</Text>
                        </div>
                        <div className="mb-6">
                              <CalendarOutlined style={{ marginRight: 8,fontSize: '20px' }} className="text-blue-500 " />
                              <Text className="text-lg text-gray-700 ">Joining Date: {formattedCreatedAt}</Text>
                        </div>
                  </div>
                  
                  </div>
              
              <div className=''>
                  <SignatureOutlined style={{ marginRight: 8,fontSize: '20px' }} className="text-blue-500 "/>
                  <Text className="text-lg text-gray-700 ">Bio: {currentUser.description || "update"} </Text>

              </div>
          </div>
          <Divider orientation="left"></Divider>
          <div className='w-3/4 mx-auto '>
              <Text className='text-xl font-bold'><VideoCameraOutlined className="text-blue-500 " style={{ marginRight: 8,fontSize: '25px'}}/>Introductory Video:</Text>
              <div className='p-2 mt-4'>
              <iframe 
                  width="100%" 
                  height="400" 
                  src={currentUser.video.replace('watch?v=', 'embed/')} 
                  title="Introductory Video" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
              </iframe></div>
          </div>
          <div className='flex justify-center w-full my-7'>
          {/* <Link to="/instructor/profile-instructor/instructor-setting"> */}
          <Button className='w-1/4 p-5 text-lg text-white rounded-full bg-gradient-to-br from-blue-400 to-purple-300'
           onClick={() => handleEdit(currentUser._id)}>
            
          <EditOutlined />Edit Profile</Button>
          {/* </Link> */}
          </div>
         
     

          
         
      </div>
  );
};

export default AboutStudent;


