
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

              {/* <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input />
              </Form.Item> */}

            
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
                name="avatar"
                label="Avatar URL"
                rules={[{ required: false }]}
              >
                <Input />
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
// import { Button, Form, Input, Typography, notification, message, Modal, Select, Upload } from 'antd';
// import React, { useState, useEffect } from 'react';
// import 'tailwindcss/tailwind.css';
// import { getUserDetail } from 'services/All/getUserDetailApiService';
// import { updateUser } from 'services/All/updateUserApiService';
// import { User } from 'models/types';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import type { UploadProps, RcFile } from 'antd/es/upload/interface';

// const { Text } = Typography;
// const { Option } = Select;

// interface FormValues {
//   name: string;
//   avatarType: string;
//   avatar: string;
//   email: string;
//   phone_number: string;
//   dob: string;
//   description: string;
//   video: string;
// }

// const SettingInstructor: React.FC = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [avatarType, setAvatarType] = useState<string>('url');
//   const [imageUrl, setImageUrl] = useState<string>();
//   const [uploadLoading, setUploadLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!userId) {
//         console.error("userId is undefined");
//         message.error('userId is undefined');
//         return;
//       }
//       try {
//         const response = await getUserDetail(userId);
//         const userData: User = response.data;
//         form.setFieldsValue({
//           name: userData.name,
//           email: userData.email,
//           avatar: userData.avatar,
//           phone_number: userData.phone_number,
//           description: userData.description,
//           video: userData.video,
//           dob: userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '',
//         });
//         setImageUrl(userData.avatar); // Set the initial image URL
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to Fetch User", error);
//         notification.error({
//           message: 'Error',
//           description: 'Failed to fetch user data',
//         });
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId, form]);

//   const prepareUserData = (values: FormValues) => {
//     return {
//       ...values,
//       role: '', 
//       status: false, 
//     };
//   };

//   const onFinish = async (values: FormValues) => {
//     setIsModalOpen(true);
//   };

//   const handleOk = async () => {
//     setIsModalOpen(false);
//     if (!userId) {
//       console.error("userId is undefined");
//       return;
//     }
//     try {
//       const values = form.getFieldsValue();
//       const userData = prepareUserData(values);
//       await updateUser(userId, userData);
//       notification.success({
//         message: 'Success',
//         description: 'Updated user data successfully',
//       });
//       navigate('/instructor/profile-instructor/');
//     } catch (error) {
//       notification.error({
//         message: 'Error',
//         description: 'Failed to update user data',
//       });
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const handleAvatarTypeChange = (value: string) => {
//     setAvatarType(value);
//   };

//   const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result as string));
//     reader.readAsDataURL(img);
//   };

//   const beforeUpload = (file: RcFile) => {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error('Image must smaller than 2MB!');
//     }
//     return isJpgOrPng && isLt2M;
//   };

//   const handleChange: UploadProps['onChange'] = (info) => {
//     if (info.file.status === 'uploading') {
//       setUploadLoading(true);
//       return;
//     }
//     if (info.file.status === 'done') {
//       getBase64(info.file.originFileObj as RcFile, (url) => {
//         setUploadLoading(false);
//         setImageUrl(url);
//         form.setFieldsValue({ avatar: url });
//       });
//     }
//   };

//   const uploadButton = (
//     <div>
//       {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex h-screen">
//       <main className="flex-1 p-6 overflow-auto hide-scrollbar mx-12">
//         <h1 className="text-2xl font-bold">Edit My Profile</h1>
//         <div className="mt-4">
          
//             <Form
//               form={form}
//               onFinish={onFinish}
//               layout="vertical"
//               className="space-y-4"
//             >
//               <Form.Item
//                 name="name"
//                 label="Name"
//                 rules={[{ required: true, message: 'Please input your name!' }]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 name="email"
//                 label="Email"
//                 rules={[{ required: true, message: 'Please input your Email!' }]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item
//                 name="avatarType"
//                 label="Avatar Type"
//                 rules={[{ required: true, message: 'Please select avatar type!' }]}
//               >
//                 <Select defaultValue="url" onChange={handleAvatarTypeChange}>
//                   <Option value="url">URL</Option>
//                   <Option value="upload">Upload</Option>
//                 </Select>
//               </Form.Item>

//               {avatarType === 'url' ? (
//                 <Form.Item
//                   name="avatar"
//                   label="Avatar URL"
//                   rules={[{ required: true, message: 'Please input avatar URL!' }]}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : (
//                 <Form.Item
//                   name="avatar"
//                   label="Upload Avatar"
//                   rules={[{ required: true, message: 'Please upload an avatar!' }]}
//                 >
//                   <Upload
//                     name="avatar"
//                     listType="picture-circle"
//                     className="avatar-uploader"
//                     showUploadList={false}
//                     action="https://your-api-url.com/upload"
//                     beforeUpload={beforeUpload}
//                     onChange={handleChange}
//                   >
//                     {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
//                   </Upload>
//                 </Form.Item>
//               )}

//               <Form.Item
//                 name="phone_number"
//                 label="Phone Number"
//                 rules={[{ required: false }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 name="dob"
//                 label="Date of Birth"
//                 rules={[{ required: false }]}
//               >
//                 <Input type="date" />
//               </Form.Item>
//               <Form.Item
//                 name="description"
//                 label="Bio"
//                 rules={[{ required: false }]}
//               >
//                 <Input.TextArea minLength={6} rows={6} />
//               </Form.Item>
//               <Form.Item
//                 name="video"
//                 label="Video URL"
//                 rules={[{ required: false }]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item className='pt-7 pb-10 w-full flex justify-center'>
//                 <Button type="primary" htmlType="submit">Save Change</Button>
//                 <Link to="/instructor/profile-instructor/">
//                   <Button className='bg-red-600 text-white ml-10'>Cancel Change</Button>
//                 </Link>
//               </Form.Item>
//             </Form>
//             <Modal title="Confirm Change" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//               <p>Do you want to save the changes?</p>
//             </Modal>
          
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SettingInstructor;
