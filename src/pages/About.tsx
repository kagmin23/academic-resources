import { TinyColor } from '@ctrl/tinycolor';
import { Button, Card, Col, ConfigProvider, Row } from 'antd';
import independent from '../assets/independent.jpg';
import present from '../assets/present.jpg';
import savetimeImage from '../assets/savetime.jpg';
import team from '../assets/team2.jpg';

const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors: string[]) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

export default function About() {
  return (
    <div>
        <div className='w-full py-20 text-center'>
            <div className='mb-4'>
                <span className='text-5xl font-bold'>Learn </span> <span className='text-5xl font-bold text-blue-600'>with passion</span>
            </div>
        
            <div><span className='text-5xl font-bold'>to live</span> <span className='text-5xl font-bold text-blue-600'>with purpose</span></div>
            <div className='mx-auto mt-5 text-center text-gray-700 md:w-1/2'><p className='text-base font-normal text-'>Academic-Resources is an online learning website with diverse, interesting, useful courses... 
                                to help you develop and perfect yourself, while also being able to access your own passions and goals.
            </p></div>
        </div>

        
        <div className='justify-center w-full py-16 bg-blue-600 md:flex'>
            <div className='w-full my-auto md:w-2/5 mr-7'>

                <div className='mb-10 text-4xl font-bold text-center text-white md:text-left'>We Just Keep Growing </div>
                <p className='text-lg text-center text-white md:text-left'>Academic-Resources is one of the learning communities with a strong position on the market today with diverse courses. We are trusted and used by many users of all ages because of our quality.</p>


            </div>
            <div className='mx-3 mt-5 md:w-2/5 md:mx-0 md:mt-0'>
                <div className='flex justify-between'>
                    <div className='w-5/12 text-center bg-purple-200 rounded-xl py-7'>
                        <p className='text-3xl font-bold'>300+</p>
                        <p className='text-lg text-gray-700'>Intructors</p>

                    </div>
                    <div className='w-5/12 text-center bg-green-100 rounded-xl py-7'>
                        <p className='text-3xl font-bold'>1500+</p>
                        <p className='text-lg text-gray-700'>Students Enrolled</p>

                    </div>

                </div>
                <div className='flex justify-between mt-5'>
                    <div className='w-5/12 text-center bg-yellow-100 rounded-xl py-7'>
                        <p className='text-3xl font-bold'>1000+</p>
                        <p className='text-lg text-gray-700'>Courses</p>

                    </div>
                    <div className='w-5/12 text-center bg-pink-200 rounded-xl py-7'>
                        <p className='text-3xl font-bold'>2800+</p>
                        <p className='text-lg text-gray-700'>Course enrollments</p>

                    </div>

                </div>

            </div>

        </div>

        <div className='w-full my-28'>
    <div className='mb-12 text-center'>
        <span className='text-2xl font-bold md:text-4xl'>Why should you choose </span> 
        <span className='text-2xl font-bold text-blue-600 md:text-4xl'>Academic-Resources ?</span>
    </div>
    <div className='w-11/12 mx-auto'>
        <Row gutter={16} className='flex flex-wrap'>
            <Col span={24} md={8} className='flex mb-8 md:mb-0'>
                <Card className='flex flex-col mx-5 bg-slate-100' bordered={true} style={{ margin: 0 }}>
                  <div className='m-0'>
                    <div className='w-11/12 h-[250px] overflow-hidden mx-auto'>
                        <img src={savetimeImage} alt="Save Time" className='object-cover w-full h-full' />
                    </div>
                    <div className='flex-grow p-0 lg:p-4'>
                        <div className='mb-2 text-xl font-bold'>Save time</div>
                        <div className='text-gray-700'>We have Online courses to help you shorten the learning process instead of registering for face-to-face classes.</div>
                    </div></div>
                </Card>
            </Col>
            <Col span={24} md={8} className='flex mb-8 md:mb-0'>
                <Card className='flex flex-col mx-5 bg-slate-100' bordered={true} style={{ margin: 0 }}>
                  <div className='m-0'>
                    <div className='w-11/12 h-[250px] overflow-hidden mx-auto'>
                        <img src={present} alt="Academic and technical support" className='object-cover w-full h-full' />
                    </div>
                    <div className='flex-grow p-4'>
                        <div className='mb-2 text-lg font-bold'>Academic and technical support</div>
                        <div className='text-gray-700'>We will support students in their learning process and resolve technical questions users encounter.</div>
                    </div></div>
                </Card>
            </Col>
            <Col span={24} md={8} className='flex'>
            
                <Card className='flex flex-col mx-5 bg-slate-100' bordered={true} style={{ margin: 0 }}>
                <div className='m-0'>
                    <div className='w-11/12 h-[250px] overflow-hidden mx-auto'>
                        <img src={independent} alt="Learn and practice" className='object-cover w-full h-full' />
                    </div>
                    <div className='flex-grow p-4'>
                        <div className='mb-2 text-xl font-bold'>Learn and practice</div>
                        <div className='text-gray-700'>Learning needs to be associated with practice, so we always have tests after each class just for you.</div>
                    </div></div>
                </Card>
            </Col>
        </Row>
    </div>
</div>


        <div className='w-full py-20 bg-slate-100'>
            <div className='mb-12 text-center'>
                <div className='mb-5 text-xl font-bold text-blue-600'>WE ARE HIRING </div>
                <div className='w-10/12 mx-auto text-2xl font-bold md:text-4xl md:w-1/2'>If You’re Looking To Make An Impact, We’re Looking For You</div>
                <div className='w-20 h-0.5 bg-blue-700 mt-10 mx-auto'></div> 
            </div>
            <div className='w-4/5 mx-auto md:flex '>
                
                <div className='md:w-1/2 md:pr-5'>
                    <p className='text-gray-700 lg:text-lg'>We work together as a friendly and supportive team. We always try to find the best solution, not the easy solution. We do our best to deliver work we are proud of. We put customers at the heart of every action.</p>
                    <p className='mt-5 text-gray-700 lg:text-lg'>Currently, we are recruiting more lecturers with the desire to find people who are passionate and enthusiastic about teaching. If you wish to join a positive working environment and contribute to student development, please join our community.</p>
                    <div className='flex justify-center w-full mt-12 mb-5 md:justify-start'>
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
                    <Button type="primary" size="large" className='p-5 text-lg font-bold'>
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