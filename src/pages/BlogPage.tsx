import { ArrowRightOutlined, FacebookOutlined, SearchOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Layout, Pagination } from 'antd';
import React from 'react';

const { Content, Sider } = Layout;

const BlogPage: React.FC = () => {
    return (
        <Layout className="min-h-screen bg-gray-100">
            <Layout className="container flex flex-col lg:flex-row mx-auto py-8 px-4 space-y-8 lg:space-y-0 lg:space-x-8">
                <Content className="flex-1 space-y-8">
                    <section className="flex flex-col p-4 bg-white rounded shadow md:flex-row">
                        <a href="/detail-blog" className="flex-shrink-0 block mb-4 md:mb-0">
                            <img src="https://accountlp.thimpress.com/wp-content/uploads/2022/11/course-8-400x300.jpg" className="object-cover w-full h-64 rounded md:w-64" alt="Blog 1" />
                        </a>
                        <div className="md:ml-4">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>109k views</span>
                                <span>March 10, 2020</span>
                            </div>
                            <a href="/detail-blog" className="block mt-2 text-xl font-bold text-gray-800">Blog Title Here</a>
                            <p className="mt-2 text-xl text-gray-600">
                                Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu...
                            </p>
                            <a href="/detail-blog" className="block mt-4 text-xl font-semibold hover:text-red-600">
                                Read More <ArrowRightOutlined />
                            </a>
                        </div>
                    </section>

                    <section className="flex flex-col p-4 bg-white rounded shadow md:flex-row">
                        <a href="/detail-blog" className="flex-shrink-0 block mb-4 md:mb-0">
                            <img src="https://accountlp.thimpress.com/wp-content/uploads/2022/11/course-8-400x300.jpg" className="object-cover w-full h-64 rounded md:w-64" alt="Blog 2" />
                        </a>
                        <div className="md:ml-4">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>109k views</span>
                                <span>March 10, 2020</span>
                            </div>
                            <a href="/detail-blog" className="block mt-2 text-xl font-bold text-gray-800">Blog Title Here</a>
                            <p className="mt-2 text-xl text-gray-600">
                                Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu...
                            </p>
                            <a href="/detail-blog" className="block mt-4 text-xl font-semibold hover:text-red-600">
                                Read More <ArrowRightOutlined />
                            </a>
                        </div>
                    </section>

                    <section className="flex flex-col p-4 bg-white rounded shadow md:flex-row">
                        <a href="/detail-blog" className="flex-shrink-0 block mb-4 md:mb-0">
                            <img src="https://accountlp.thimpress.com/wp-content/uploads/2022/11/course-8-400x300.jpg" className="object-cover w-full h-64 rounded md:w-64" alt="Blog 3" />
                        </a>
                        <div className="md:ml-4">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>109k views</span>
                                <span>March 10, 2020</span>
                            </div>
                            <a href="/detail-blog" className="block mt-2 text-xl font-bold text-gray-800">Blog Title Here</a>
                            <p className="mt-2 text-xl text-gray-600">
                                Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu...
                            </p>
                            <a href="/detail-blog" className="block mt-4 text-xl font-semibold hover:text-red-600">
                                Read More <ArrowRightOutlined />
                            </a>
                        </div>
                    </section>

                    <div className="flex items-center justify-between">
                        <Button className="px-4 py-2 text-gray-700 bg-gray-300 rounded">Previous</Button>
                        <Pagination defaultCurrent={1} total={50} />
                        <Button className="px-4 py-2 text-gray-700 bg-gray-300 rounded">Next</Button>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default BlogPage;
