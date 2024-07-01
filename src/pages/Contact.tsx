import { MessageOutlined, QuestionCircleOutlined, SettingOutlined, StarOutlined } from '@ant-design/icons';
import FacebookIcon from '@mui/icons-material/Facebook';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { blue, red } from '@mui/material/colors';
import { Avatar } from 'antd';
export default function Contact() {
  return (
    <div className="w-full min-h-screen mx-auto bg-gray-200">
            <div className="p-3 mb-4 font-bold md:text-2xl sm:text-lg bg-stone-50 md:px-32">Contact</div>
            <div className='mx-auto md:w-4/5 sm:w-full mt-14'>
                <div className='flex justify-between mx-auto '>
                    <div className='flex flex-col items-center justify-center w-1/5 px-5 py-8 shadow-lg cursor-pointer bg-slate-50 hover:scale-110'>
                    <Avatar className='bg-blue-700 ' size={{ xs: 50, sm: 50, md: 65, lg: 65, xl: 65, xxl: 65 }} icon={<QuestionCircleOutlined />} />
                    <p className='h-10 mt-3 font-semibold text-center md:text-xl sm:text-lg'>About Us</p>

                    </div>
                    <div className='flex flex-col items-center justify-center w-1/5 px-5 py-8 shadow-lg cursor-pointer bg-slate-50 hover:scale-110'>
                    <Avatar className='bg-blue-700' size={{ xs: 50, sm: 50, md: 65, lg: 65, xl: 65, xxl: 65 }} icon={<MessageOutlined />} />
                    <p className='h-10 mt-3 font-semibold text-center md:text-xl sm:text-lg'>Blog</p>

                    </div>
                    <div className='flex flex-col items-center justify-center w-1/5 px-5 py-8 shadow-lg cursor-pointer bg-slate-50 hover:scale-110'>
                    <Avatar className='bg-blue-700' size={{ xs: 50, sm: 50, md: 65, lg: 65, xl: 65, xxl: 65 }} icon={<StarOutlined />} />
                    <p className='h-10 mt-3 font-semibold text-center md:text-xl sm:text-lg'>Rakings</p>

                    </div>
                    <div className='flex flex-col items-center justify-center w-1/5 px-5 py-8 shadow-lg cursor-pointer bg-slate-50 hover:scale-110'>
                    <Avatar className='bg-blue-700' size={{ xs: 50, sm: 50, md: 65, lg: 65, xl: 65, xxl: 65 }} icon={<SettingOutlined />} />
                    <p className='h-10 mt-3 font-semibold text-center md:text-xl sm:text-lg'>Help Center</p>

                    </div>


                </div>

                <div className='mt-16 lg:flex'>
                <div className="cursor-pointer lg:w-2/3 sm:w-full sm:mx-auto"> 
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
                     <p className='mb-5 text-xl font-bold md:mt-0 sm:mt-8'>Contact Information</p>
                     <div className='w-16 h-0.5 bg-blue-700 mb-10'></div> 
                     <div className='flex mb-4'>
                         <div className='flex w-40 text-sm font-semibold '>
                            <FmdGoodOutlinedIcon className='mr-2' /> Main Address:
                        </div>
                        <div className='flex-1 text-sm text-gray-600'>Đ. D1, Phường Tân Phú, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 70000</div>
                    </div>
                    <div className='flex mb-4'>
                        <div className='flex w-40 text-sm font-semibold '>
                         <MailOutlineIcon className='mr-2' /> Email Address:
                        </div>
                        <div className='flex-1 text-sm text-gray-600'>nhom4@gmail.com</div>
                    </div>
                    <div className='flex mb-4'>
                        <div className='flex w-40 text-sm font-semibold'>
                        <PhoneIcon className='mr-2' /> Phone Number:
                        </div>
                        <div className='flex-1 text-sm text-gray-600'>0123456789</div>
                     </div>
                     <div className='mt-10 '>
                        <InstagramIcon className='mr-4 cursor-pointer' fontSize="large" sx={{ color: red[300] }}/>
                        <FacebookIcon className='mr-4 cursor-pointer' fontSize="large" sx={{ color: blue[900] }}/>
                        <YouTubeIcon  className='mr-4 cursor-pointer' fontSize="large" sx={{ color: red[800] }}/>
                        <GitHubIcon className='mr-4 cursor-pointer' fontSize="large" />
                     
                     </div>
</div>




               

                </div>

            </div>
     </div>
  )
}