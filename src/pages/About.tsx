import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Card, Col, Row } from 'antd';
import savetimeImage from '../assets/savetime.jpg';
import present from '../assets/present.jpg';
import independent from'../assets/independent.jpg';
import team from'../assets/team2.jpg';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';

const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

export default function About() {
  return (
    <div>
        <div className='text-center w-full py-20'>
            <div className='mb-4'>
                <span className='text-5xl font-bold'>Learn </span> <span className='text-blue-600 text-5xl font-bold'>with passion</span>
            </div>
        
            <div><span className='text-5xl font-bold'>to live</span> <span className='text-blue-600 text-5xl font-bold'>with purpose</span></div>
            <div className='md:w-1/2 text-center mx-auto mt-5 text-gray-700'><p className='text- font-normal text-base'>Academic-Resources is an online learning website with diverse, interesting, useful courses... 
                                to help you develop and perfect yourself, while also being able to access your own passions and goals.
            </p></div>
        </div>

        
        <div className='bg-blue-600 w-full md:flex py-16 justify-center'>
            <div className='md:w-2/5 w-full my-auto mr-7'>

                <div className='text-white text-4xl font-bold mb-10 text-center md:text-left'>We Just Keep Growing </div>
                <p className='text-white text-lg text-center md:text-left'>Academic-Resources is one of the learning communities with a strong position on the market today with diverse courses. We are trusted and used by many users of all ages because of our quality.</p>


            </div>
            <div className='md:w-2/5 mx-3 mt-5 md:mx-0 md:mt-0'>
                <div className='flex justify-between'>
                    <div className='bg-purple-200 w-5/12 rounded-xl text-center py-7'>
                        <p className='text-3xl font-bold'>300+</p>
                        <p className='text-gray-700 text-lg'>Intructors</p>

                    </div>
                    <div className='bg-green-100 w-5/12 rounded-xl text-center py-7'>
                        <p className='text-3xl font-bold'>1500+</p>
                        <p className='text-gray-700 text-lg'>Students Enrolled</p>

                    </div>

                </div>
                <div className='flex justify-between mt-5'>
                    <div className='bg-yellow-100 w-5/12 rounded-xl text-center py-7'>
                        <p className='text-3xl font-bold'>1000+</p>
                        <p className='text-gray-700 text-lg'>Courses</p>

                    </div>
                    <div className='bg-pink-200 w-5/12 rounded-xl text-center py-7'>
                        <p className='text-3xl font-bold'>2800+</p>
                        <p className='text-gray-700 text-lg'>Course enrollments</p>

                    </div>

                </div>

            </div>

        </div>

        <div className='w-full my-28'>
    <div className='text-center mb-12'>
        <span className='md:text-4xl text-2xl font-bold'>Why should you choose </span> 
        <span className='text-blue-600 md:text-4xl text-2xl font-bold'>Academic-Resources ?</span>
    </div>
    <div className='w-11/12 mx-auto'>
        <Row gutter={16} className='flex flex-wrap'>
            <Col span={24} md={8} className='flex mb-8 md:mb-0'>
                <Card className='bg-slate-100 mx-5 flex flex-col' bordered={true} style={{ margin: 0 }}>
                  <div className='m-0'>
                    <div className='w-11/12 h-[250px] overflow-hidden mx-auto'>
                        <img src={savetimeImage} alt="Save Time" className='object-cover w-full h-full' />
                    </div>
                    <div className='lg:p-4 p-0 flex-grow'>
                        <div className='font-bold text-xl mb-2'>Save time</div>
                        <div className='text-gray-700'>We have Online courses to help you shorten the learning process instead of registering for face-to-face classes.</div>
                    </div></div>
                </Card>
            </Col>
            <Col span={24} md={8} className='flex mb-8 md:mb-0'>
                <Card className='bg-slate-100 mx-5  flex flex-col' bordered={true} style={{ margin: 0 }}>
                  <div className='m-0'>
                    <div className='w-11/12 h-[250px] overflow-hidden mx-auto'>
                        <img src={present} alt="Academic and technical support" className='object-cover w-full h-full' />
                    </div>
                    <div className='p-4 flex-grow'>
                        <div className='font-bold text-lg mb-2'>Academic and technical support</div>
                        <div className='text-gray-700'>We will support students in their learning process and resolve technical questions users encounter.</div>
                    </div></div>
                </Card>
            </Col>
            <Col span={24} md={8} className='flex'>
            
                <Card className='bg-slate-100 mx-5  flex flex-col' bordered={true} style={{ margin: 0 }}>
                <div className='m-0'>
                    <div className='w-11/12 h-[250px] overflow-hidden mx-auto'>
                        <img src={independent} alt="Learn and practice" className='object-cover w-full h-full' />
                    </div>
                    <div className='p-4 flex-grow'>
                        <div className='font-bold text-xl mb-2'>Learn and practice</div>
                        <div className='text-gray-700'>Learning needs to be associated with practice, so we always have tests after each class just for you.</div>
                    </div></div>
                </Card>
            </Col>
        </Row>
    </div>
</div>


        <div className='w-full bg-slate-100 py-20'>
            <div className='text-center mb-12'>
                <div className='text-blue-600 text-xl font-bold mb-5'>WE ARE HIRING </div>
                <div className='md:text-4xl text-2xl font-bold md:w-1/2 w-10/12 mx-auto'>If You’re Looking To Make An Impact, We’re Looking For You</div>
                <div className='w-20 h-0.5 bg-blue-700 mt-10 mx-auto'></div> 
            </div>
            <div className='w-4/5 md:flex mx-auto '>
                
                <div className='md:w-1/2 md:pr-5'>
                    <p className='text-gray-700 lg:text-lg'>We work together as a friendly and supportive team. We always try to find the best solution, not the easy solution. We do our best to deliver work we are proud of. We put customers at the heart of every action.</p>
                    <p className='text-gray-700 lg:text-lg mt-5'>Currently, we are recruiting more lecturers with the desire to find people who are passionate and enthusiastic about teaching. If you wish to join a positive working environment and contribute to student development, please join our community.</p>
                    <div className='w-full mt-12 mb-5 flex justify-center md:justify-start'>
                <ConfigProvider 
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                                colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                                colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                                lineWidth: 0,
                            },
                        },
                    }}
                >
                    <Button type="primary" size="large" className='text-lg font-bold p-5'>
                        Join Our Team
                    </Button>
                </ConfigProvider>
            </div>
                </div>
                <div className='md:w-1/2 '>
                <img src={team} alt="Team" className='w-full'  />
                </div>
            </div>

        

        </div>
       
    </div>
  )
}
