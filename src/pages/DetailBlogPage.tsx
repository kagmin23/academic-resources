import { ArrowLeftOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, List } from 'antd';
import React from 'react';

const { Content } = Layout;

const suggestedBlogs = [
    {
        title: 'Blog Title 1',
        description: 'Short description of blog 1.',
        image: 'https://via.placeholder.com/150',
        date: 'June 20, 2024',
    },
    {
        title: 'Blog Title 2',
        description: 'Short description of blog 2.',
        image: 'https://via.placeholder.com/150',
        date: 'June 18, 2024',
    },
    {
        title: 'Blog Title 3',
        description: 'Short description of blog 3.',
        image: 'https://via.placeholder.com/150',
        date: 'June 15, 2024',
    },
];

const DetailBlogPage: React.FC = () => {
    return (
        <Layout className="w-full p-5 mx-auto md:w-3/4" style={{ backgroundColor: 'white' }}>
            <div className="flex items-start justify-between">
                <a href="/blog">
                    <Button 
                        type='default' 
                        icon={<ArrowLeftOutlined />} 
                        className="fixed p-4 text-lg font-semibold text-gray-700 transition-transform duration-300 transform bg-white border border-none rounded-lg hover:bg-gray-100 hover:scale-110"
                        style={{ left: '30px' }}
                    >
                        Back
                    </Button>
                </a>
                <h1 className="w-full text-4xl font-semibold text-center">Blog Title Here</h1>
            </div>
            <Content className="container flex flex-wrap px-4 py-8 mx-auto">
                <div className="flex flex-col items-center w-full mx-auto md:w-3/4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuihR2UVyEaYQIwnYLELckCIj8EhxWRsKR-Q&s" className="object-cover w-full rounded md:w-3/4 md:h-auto" alt="Blog 1" />
                    <div className="mt-5 text-xl text-gray-600 ">
                        <span>109k views </span>
                        <span>March 10, 2020</span>
                    </div>
                    <p className='pt-6 mt-5 text-xl text-gray-600 border-t border-solid border-t-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat maximus pellentesque. Integer sem enim, luctus at nibh at, condimentum sagittis sapien. Sed tempus ipsum erat, sit amet efficitur velit interdum eu. Vestibulum hendrerit id dolor eu scelerisque. Phasellus ex dui, consequat nec feugiat eu, dapibus eget ante. Sed sodales interdum dui, at euismod mi feugiat hendrerit. Suspendisse auctor libero in tempor mollis. Nulla et dolor velit. Aliquam sit amet luctus quam.</p>
                </div>
                <div className="flex flex-col items-center w-full mx-auto md:w-3/4">
                    <ul>
                        <h1 className='mt-10 mb-5 text-2xl font-semibold'>Why did you decide to teach on Cursus?</h1>
                        <p className='mt-4 text-xl text-gray-600'>Nam a egestas libero, eget eleifend turpis. Sed id ipsum a ipsum aliquam laoreet sit amet sit amet nibh. Proin dapibus, libero sed posuere rhoncus, orci mi cursus enim, at accumsan eros massa lacinia mi. Nunc eget finibus felis, volutpat malesuada sem. Aliquam ac nisl pellentesque, varius neque sit amet, porttitor nunc. Nullam elit tellus, dapibus non eleifend sed, hendrerit eget velit. Aliquam ut felis dictum, tincidunt magna vitae, aliquam massa.</p>
                    </ul>
                    <ul>
                        <h1 className='mt-10 mb-5 text-2xl font-semibold'>Did you have any prior on- or offline teaching experience prior to publishing your first Cursus course?</h1>
                        <p className='mt-4 text-xl text-gray-600'>Morbi lectus nunc, lacinia ut consequat a, semper vel erat. Duis ut lacus nec dui sodales mattis. Mauris tellus dolor, pulvinar sit amet pretium a, malesuada sed tellus. Aliquam ultrices elit neque, quis lacinia ex porttitor non. Donec ac iaculis turpis. Nulla lacinia enim quis orci aliquam, non cursus urna pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus in mi a nisi auctor interdum. Vivamus faucibus magna sed elit interdum consequat. Vestibulum eu tortor vel ante feugiat faucibus quis et urna.</p>
                    </ul>
                    <ul>
                        <h1 className='mt-10 mb-5 text-2xl font-semibold'>What are the most rewarding aspects of teaching on Cursus?</h1>
                        <p className='mt-4 text-xl text-gray-600'>Quisque et bibendum urna, eget consequat sapien. Integer sed condimentum nibh. Integer id neque tristique, lobortis massa ac, dapibus nibh. Donec nulla odio, porttitor ac rutrum eget, volutpat a velit. Curabitur et enim quis diam congue dictum et vitae dui. Nulla tortor orci, luctus a pretium vel, ultrices porta nisl.</p>
                    </ul>
                </div>
            </Content>

            {/* List of suggested blogs */}
            <Content className="container px-4 py-8 mx-auto">
                <h2 className="text-3xl font-semibold text-center">Suggested Blogs</h2>
                <List
                    itemLayout="horizontal"
                    dataSource={suggestedBlogs}
                    renderItem={item => (
                        <List.Item className="p-4 mt-4 transition-shadow duration-300 bg-white rounded-lg shadow-sm hover:shadow-md">
                            <List.Item.Meta
                                avatar={<Avatar src={item.image} />}
                                title={<a href="/">{item.title}</a>}
                                description={(
                                    <>
                                        <p>{item.description}</p>
                                        <p className="text-sm text-gray-500">{item.date}</p>
                                    </>
                                )}
                            />
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    );
};

export default DetailBlogPage;
