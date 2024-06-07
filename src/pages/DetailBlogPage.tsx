import React from 'react';
import { Layout, Button } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined, ArrowLeftOutlined} from '@ant-design/icons';

const { Content } = Layout;

const DetailBlogPage: React.FC = () => {
    return (
        <Layout className="p-5 w-full md:w-3/4 mx-auto" style={{ backgroundColor: 'white' }}>
            <div className="flex justify-between items-center">
                <a href="/blog">
                    <Button 
                        type='default' 
                        icon={<ArrowLeftOutlined />} 
                        className="p-4 font-semibold bg-white text-gray-700 text-lg border border-none rounded-lg hover:bg-gray-100 transform transition-transform duration-300 hover:scale-110"
                    >
                        Back
                    </Button>
                </a>
                <h1 className="text-center text-4xl font-semibold w-full">Blog Title Here</h1>
            </div>
            <Content className="container mx-auto flex flex-wrap px-4 py-8">
                <div className="w-full md:w-3/4 mx-auto flex flex-col items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuihR2UVyEaYQIwnYLELckCIj8EhxWRsKR-Q&s" className="w-full md:w-3/4 md:h-auto object-cover rounded" alt="Blog 1" />
                    <div className="text-gray-600 text-xl mt-5 ">
                        <span>109k views </span>
                        <span>March 10, 2020</span>
                    </div>
                    <p className='text-xl mt-5 text-gray-600 border-t border-solid border-t-1 pt-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat maximus pellentesque. Integer sem enim, luctus at nibh at, condimentum sagittis sapien. Sed tempus ipsum erat, sit amet efficitur velit interdum eu. Vestibulum hendrerit id dolor eu scelerisque. Phasellus ex dui, consequat nec feugiat eu, dapibus eget ante. Sed sodales interdum dui, at euismod mi feugiat hendrerit. Suspendisse auctor libero in tempor mollis. Nulla et dolor velit. Aliquam sit amet luctus quam.</p>
                </div>
                <div className="w-full md:w-3/4 mx-auto flex flex-col items-center">
                    <ul>
                        <h1 className='text-2xl font-semibold mb-5 mt-10'>Why did you decide to teach on Cursus?</h1>
                        <p className='text-xl mt-4 text-gray-600'>Nam a egestas libero, eget eleifend turpis. Sed id ipsum a ipsum aliquam laoreet sit amet sit amet nibh. Proin dapibus, libero sed posuere rhoncus, orci mi cursus enim, at accumsan eros massa lacinia mi. Nunc eget finibus felis, volutpat malesuada sem. Aliquam ac nisl pellentesque, varius neque sit amet, porttitor nunc. Nullam elit tellus, dapibus non eleifend sed, hendrerit eget velit. Aliquam ut felis dictum, tincidunt magna vitae, aliquam massa.</p>
                    </ul>
                    <ul>
                        <h1 className='text-2xl font-semibold mb-5 mt-10'>Did you have any prior on- or offline teaching experience prior to publishing your first Cursus course?</h1>
                        <p className='text-xl mt-4 text-gray-600'>Morbi lectus nunc, lacinia ut consequat a, semper vel erat. Duis ut lacus nec dui sodales mattis. Mauris tellus dolor, pulvinar sit amet pretium a, malesuada sed tellus. Aliquam ultrices elit neque, quis lacinia ex porttitor non. Donec ac iaculis turpis. Nulla lacinia enim quis orci aliquam, non cursus urna pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus in mi a nisi auctor interdum. Vivamus faucibus magna sed elit interdum consequat. Vestibulum eu tortor vel ante feugiat faucibus quis et urna.</p>
                    </ul>
                    <ul>
                        <h1 className='text-2xl font-semibold mb-5 mt-10'>What are the most rewarding aspects of teaching on Cursus?</h1>
                        <p className='text-xl mt-4 text-gray-600'>Quisque et bibendum urna, eget consequat sapien. Integer sed condimentum nibh. Integer id neque tristique, lobortis massa ac, dapibus nibh. Donec nulla odio, porttitor ac rutrum eget, volutpat a velit. Curabitur et enim quis diam congue dictum et vitae dui. Nulla tortor orci, luctus a pretium vel, ultrices porta nisl.</p>
                    </ul>
                </div>
            </Content>
            <div className="flex justify-between items-center w-full mt-8">
                <Button 
                    type='default' 
                    icon={<DoubleLeftOutlined />} 
                    className="p-6 font-semibold bg-white text-gray-700 text-lg border border-gray-300 rounded-lg hover:bg-gray-100 transform transition-transform duration-300 hover:scale-110"
                >
                    Previous
                </Button>
                <Button 
                    type='default' 
                    icon={<DoubleRightOutlined />} 
                    className="p-6 font-semibold bg-white text-gray-700 text-lg border border-gray-300 rounded-lg hover:bg-gray-100 transform transition-transform duration-300 hover:scale-110"
                >
                    Next
                </Button>
            </div>
        </Layout>
    );
};

export default DetailBlogPage;
