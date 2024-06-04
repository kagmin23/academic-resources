import React from 'react'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { QuestionCircleOutlined, MessageOutlined,FundProjectionScreenOutlined,SettingOutlined} from '@ant-design/icons';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { blue, purple, red } from '@mui/material/colors';
export default function Contact() {
  return (
    <div className="mx-auto w-full min-h-screen bg-gray-200">
            <div className="md:text-2xl sm:text-lg p-3 font-bold mb-4 bg-stone-50 md:px-32">Contact</div>
            <div className='mx-auto w-4/5 mt-14'>
                <div className=' flex justify-between mx-auto'>
                    <div className='w-1/5 bg-slate-50 py-8  px-10 flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-110'>
                    <Avatar className='bg-blue-700 ' size={65} icon={<QuestionCircleOutlined />} />
                    <p className='font-semibold text-xl mt-3'>Help Center</p>

                    </div>
                    <div className='w-1/5 bg-slate-50 py-8 px-5 flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-110'>
                    <Avatar className='bg-blue-700' size={65} icon={<MessageOutlined />} />
                    <p className='font-semibold text-xl mt-3'>Blog</p>

                    </div>
                    <div className='w-1/5 bg-slate-50 py-8 px-5 flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-110'>
                    <Avatar className='bg-blue-700' size={65} icon={<FundProjectionScreenOutlined />} />
                    <p className='font-semibold text-xl mt-3'>Careers</p>

                    </div>
                    <div className='w-1/5 bg-slate-50 py-8 px-5 flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-110'>
                    <Avatar className='bg-blue-700' size={65} icon={<SettingOutlined />} />
                    <p className='font-semibold text-xl mt-3'>Developer Area</p>

                    </div>


                </div>

                <div className='mt-16 lg:flex'>
                <div className="lg:w-2/3 sm:w-full sm:mx-auto cursor-pointer"> 
                <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.3942210036507!2d106.78804887480605!3d10.857590889296155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527692dcbc14b%3A0xb6aada118566b9c5!2sOneHub%20Saigon!5e0!3m2!1svi!2s!4v1717525736327!5m2!1svi!2s"
                 width="100%"
                 height="350"
                 style={{  border: "8px solid white" }}
                 allowFullScreen
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 ></iframe></div>   
                 <div className='lg:w-1/3 sm:w-full lg:ml-5'>
                     <p className='text-xl font-bold mb-5 '>Contact Information</p>
                     <div className='w-16 h-0.5 bg-blue-700 mb-10'></div> 
                     <div className='flex mb-4'>
                         <div className='w-40 text-sm font-semibold flex '>
                            <FmdGoodOutlinedIcon className='mr-2' /> Main Address:
                        </div>
                        <div className='text-sm text-gray-600 flex-1'>Đ. D1, Phường Tân Phú, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 70000</div>
                    </div>
                    <div className='flex mb-4'>
                        <div className='w-40 text-sm font-semibold flex '>
                         <MailOutlineIcon className='mr-2' /> Email Address:
                        </div>
                        <div className='text-sm text-gray-600 flex-1'>nhom4@gmail.com</div>
                    </div>
                    <div className='flex mb-4'>
                        <div className='w-40 text-sm font-semibold flex'>
                        <PhoneIcon className='mr-2' /> Phone Number:
                        </div>
                        <div className='text-sm text-gray-600 flex-1'>0123456789</div>
                     </div>
                     <div className='mt-10 '>
                        <XIcon  className='mr-4 cursor-pointer' />
                        <FacebookIcon className='mr-4 cursor-pointer' fontSize="large" sx={{ color: blue[900] }}/>
                        <YouTubeIcon  className='mr-4 cursor-pointer' fontSize="large" sx={{ color: red[800] }}/>
                        <LinkedInIcon className='mr-4 cursor-pointer' fontSize="large" sx={{ color: purple[800] }}/>
                     
                     </div>
</div>




               

                </div>

            </div>
     </div>       
  )
}
