import { ArrowRightOutlined, PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Pagination } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const { Content, Sider } = Layout;

const BlogPage: React.FC = () => {

    const [ searchTerm, setSearchTerm ] = useState<string>('')

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    return (
        <Layout className="min-h-screen bg-gray-100">
            <Layout className="container flex flex-col px-4 py-8 mx-auto space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
                <Content className="flex-1 space-y-8">

                <div className="flex flex-col items-start justify-between mb-4 space-y-4 md:flex-row md:items-center md:space-y-0 bg-[#939fb1] px-2 py-2">
                        <div className="w-full md:w-1/3">
                            <Input
                                className=""
                                placeholder="Search"
                                prefix={<SearchOutlined />}
                                onChange={handleSearchChange}
                                value={searchTerm}
                            />
                        </div>
                        
                        <Link to={"/add-blog"}>
                            <div className="w-full md:w-auto">
                                <Button className="w-full px-4 py-2 text-white bg-red-500 md:w-auto md:px-6 md:py-3 group hover:text-blue-500">
                                    <PlusCircleFilled className="text-white group-hover:text-blue-500" />
                                    <span className="hidden md:inline-block group-hover:text-blue-500">Add New Blog</span>
                                </Button>
                            </div>
                        </Link>


                    </div>

                
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
