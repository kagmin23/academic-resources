// import { Button, Form, Input, Typography, notification } from 'antd';
// import React, { useState } from 'react';
// import 'tailwindcss/tailwind.css';
// import { useParams } from 'react-router-dom';
// import { getUserDetail } from "services/All/getUserDetailApiService";
// import { updateUser } from "services/All/updateUserApiService";

// const { Text } = Typography;

// // interface FormValues {
// //   name: string;
// //   email: string;
// //   password: string;
// //   facebook: string;
// //   linkedin: string;
// // }

// const SettingInstructor: React.FC = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [data, setData] = useState<[]>([]);

//   // const [itemStates, setItemStates] = useState<{ [key: string]: boolean }>({
//   //   'Email': false,
//   //   'User Name': false,
//   //   'Giới thiệu': false,
//   //   'Avatar': false,
//   //   'GitHub': false,
//   //   'Facebook': false,
//   //   'YouTube': false,
//   //   'TikTok': false,
//   // });

//   // const [email, setEmail] = useState<string>('ngoclnse@gmail.com');
//   // const [userName, setUserName] = useState<string>('lenhungock17hcm');
//   // const [bio, setBio] = useState<string>('Chưa cập nhật');
//   // const [avatar, setAvatar] = useState<string>('https://files.fullstack.edu.vn/f8-prod/user_photos/379503/65826d8841a16.jpg');
  
//   // const handleItemClick = (label: string) => {
//   //   setItemStates({ ...itemStates, [label]: !itemStates[label] });
//   // };

//   // const handleEmailSave = (values: any) => {
//   //   setEmail(values.newEmail);
//   //   setItemStates({ ...itemStates, 'Email': false });
//   //   notification.success({
//   //     message: 'Success',
//   //     description: 'Updated Email successfully',
//   //   });
//   // };

//   // const handleUserNameSave = (values: any) => {
//   //   setUserName(values.newUserName);
//   //   setItemStates({ ...itemStates, 'User Name': false });
//   //   notification.success({
//   //     message: 'Success',
//   //     description: 'Updated User Name successfully',
//   //   });
//   // };

//   // const handleBioSave = (values: any) => {
//   //   setBio(values.newBio);
//   //   setItemStates({ ...itemStates, 'Giới thiệu': false });
//   //   notification.success({
//   //     message: 'Success',
//   //     description: 'Updated Bio successfully',
//   //   });
//   // };

//   // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files && e.target.files[0]) {
//   //     const reader = new FileReader();
//   //     reader.onload = function (e) {
//   //       if (e.target) {
//   //         setAvatar(e.target.result as string);
//   //       }
//   //     };
//   //     reader.readAsDataURL(e.target.files[0]);
//   //   }
//   //   setItemStates({ ...itemStates, 'Avatar': false });
//   //   notification.success({
//   //     message: 'Success',
//   //     description: 'Updated Avatar successfully',
//   //   });
//   // };

  

//   return (
//     <div className="flex h-screen">
//       <main className="flex-1 p-6 overflow-auto">
//         <h1 className="text-2xl font-bold">Edit My Profile</h1>
//         <div className="mt-4">
//           <section className="mb-6">

//             {/* <div className="mb-4">
//               <h2 className="text-xl font-semibold">Basic information</h2>
//               <p className="text-gray-600">Manage your display name, username, bio and avatar.</p>
//             </div> */}




// {/* 
//             <div className="space-y-4">
//               <div className='p-4 border rounded-lg'>
//                 <ProfileItem
//                   label="Email"
//                   value={email}
//                   isOpen={itemStates['Email']}
//                   onItemClick={handleItemClick}
//                   onSave={handleEmailSave}
//                 />
//               </div>
//               <div className='p-4 border rounded-lg'>
//                 <ProfileItem
//                   label="User Name"
//                   value={userName}
//                   isOpen={itemStates['User Name']}
//                   onItemClick={handleItemClick}
//                   onSave={handleUserNameSave}
//                 />
//               </div>
//               <div className='p-4 border rounded-lg'>
//                 <ProfileItem
//                   label="Giới thiệu"
//                   value={bio}
//                   isOpen={itemStates['Giới thiệu']}
//                   onItemClick={handleItemClick}
//                   onSave={handleBioSave}
//                 />
//               </div>
//               <div className='p-4 border rounded-lg'>
//                 <ProfileItem
//                   label="Avatar"
//                   value={<img className="w-16 h-16 rounded-full" src={avatar} alt="avatar" />}
//                   isOpen={itemStates['Avatar']}
//                   onItemClick={handleItemClick}
//                   onSave={handleAvatarChange}
//                   isFileUpload
//                 />
//               </div>
//             </div> */}
//           </section>
        
//         </div>
//       </main>
//     </div>
//   );
// };

// // type ProfileItemProps = {
// //   label: string;
// //   value: React.ReactNode;
// //   isOpen: boolean;
// //   onItemClick: (label: string) => void;
// //   onSave: (values: any) => void;
// //   isFileUpload?: boolean;
// // };

// // const ProfileItem: React.FC<ProfileItemProps> = ({
// //   label,
// //   value,
// //   isOpen,
// //   onItemClick,
// //   onSave,
// //   isFileUpload = false,
// // }) => {
// //   const [form] = Form.useForm();

// //   const handleSave = (values: any) => {
// //     onSave(values);
// //   };

// //   const onFinish = (values: any) => {
// //     console.log('Received values of form: ', values);
// //     notification.success({
// //       message: 'Success',
// //       description: `Updated ${label} successfully`,
// //     });
// //   };

// //   return (
// //     <div>
// //       <div className="flex items-center justify-between cursor-pointer" onClick={() => onItemClick(label)}>
// //         <div>
// //           <h4 className="text-lg font-medium">{label}</h4>
// //           <Text className="text-gray-800">{value}</Text>
// //         </div>
// //         <Button className="text-gray-500">
// //           <svg
// //             aria-hidden="true"
// //             focusable="false"
// //             data-prefix="fas"
// //             data-icon="chevron-right"
// //             className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-90' : ''}`}
// //             role="img"
// //             xmlns="http://www.w3.org/2000/svg"
// //             viewBox="0 0 320 512"
// //           >
// //             <path
// //               fill="currentColor"
// //               d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
// //             ></path>
// //           </svg>
// //         </Button>
// //       </div>
// //       {isOpen && (
// //         <div className="mt-4 space-y-4">
// //           <Form form={form} name={`update${label.replace(' ', '')}`} onFinish={onFinish}>
// //             {isFileUpload ? (
// //               <Form.Item
// //                 name="updateFile"
// //                 label={`Update ${label}`}
// //                 rules={[{ required: true, message: `Please select an update ${label.toLowerCase()}!` }]}
// //               >
// //                 <Input type="file" accept="image/*" />
// //               </Form.Item>
// //             ) : (
// //               <Form.Item
// //                 name={`update${label.replace(' ', '')}`}
// //                 label={`Update ${label}`}
// //                 rules={[{ required: true, message: `Please input your update ${label.toLowerCase()}!` }]}
// //               >
// //                 <Input />
// //               </Form.Item>
// //             )}
// //             <Form.Item>
// //               <Button type="primary" htmlType="submit">
// //                 Save
// //               </Button>
// //             </Form.Item>
// //           </Form>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// export default SettingInstructor;





import { Button, Form, Input, Typography, notification, message, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { getUserDetail } from 'services/All/getUserDetailApiService';
import { updateUser } from 'services/All/updateUserApiService';
import { User } from 'models/types';
import { Link, useParams, useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface FormValues {
  name: string;
  avatar: string;
  email: string;
  phone_number: string;
  dob: string;
  description: string;
  video: string;
}

const SettingInstructor: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("userId is undefined");
        message.error('userId is undefined');
        return;
      }
      try {
        const response = await getUserDetail(userId);
        const userData: User = response.data;
        form.setFieldsValue({
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          phone_number: userData.phone_number,
          description: userData.description,
          video: userData.video,
          dob: userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '',
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to Fetch User", error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch user data',
        });
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, form]);

  const prepareUserData = (values: FormValues) => {
    return {
      ...values,
      role: '', 
      status: false, 
    };
  };

  const onFinish = async (values: FormValues) => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    if (!userId) {
      console.error("userId is undefined");
      return;
    }
    try {
      const values = form.getFieldsValue();
      const userData = prepareUserData(values);
      await updateUser(userId, userData);
      notification.success({
        message: 'Success',
        description: 'Updated user data successfully',
      });
      navigate('/instructor/profile-instructor/');
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update user data',
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 overflow-auto hide-scrollbar mx-12">
        <h1 className="text-2xl font-bold">Edit My Profile</h1>
        <div className="mt-4">
          
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="avatar"
                label="Avatar URL"
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[{ required: false }]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Bio"
                rules={[{ required: false }]}
              >
                <Input.TextArea minLength={6} rows={6} />
              </Form.Item>
              <Form.Item
                name="video"
                label="Video URL"
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>

              <Form.Item className='pt-7 pb-10 w-full flex justify-center'>
                <Button type="primary" htmlType="submit">Save Change</Button>
                <Link to="/instructor/profile-instructor/">
                  <Button className='bg-red-600 text-white ml-10'>Cancel Change</Button>
                </Link>
              </Form.Item>
            </Form>
            <Modal title="Confirm Change" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <p>Do you want to save the changes?</p>
            </Modal>
          
        </div>
      </main>
    </div>
  );
};

export default SettingInstructor;
