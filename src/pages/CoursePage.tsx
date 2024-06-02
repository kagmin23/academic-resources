import React from 'react';
import { Avatar, Rate, Collapse } from 'antd';
import 'tailwindcss/tailwind.css';

const { Panel } = Collapse;

const CoursePage = () => {
    const ratings = [
        { stars: 5, percentage: 0 },
        { stars: 4, percentage: 0 },
        { stars: 3, percentage: 0 },
        { stars: 2, percentage: 0 },
        { stars: 1, percentage: 0 },
    ];

    return (
        <div className="course_page">
            <div className="mb-8 bg-[#333333] text-[#fff] ">
                <h2 className="text-2xl font-semibold mb-4">Introduction to Marketing</h2>
                <p>This tutorial will introduce you to PHP, a server-side scripting language you can use to make dynamic websites and web applications.</p>
            </div>
            <div className="container mx-auto p-4 md:flex">
                <div className="md:w-8/12">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                        <div>
                            <h4 className="text-xl font-semibold">COURSE DESCRIPTION</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            <h4 className="text-xl font-semibold">CERTIFICATION</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            <h4 className="text-xl font-semibold">LEARNING OUTCOMES</h4>
                            <ul className="list-disc pl-5">
                                <li>Over 37 lectures and 55.5 hours of content!</li>
                                <li>LIVE PROJECT End to End Software Testing Training Included.</li>
                                <li>Learn Software Testing and Automation basics from a professional trainer from your own desk.</li>
                                <li>Information packed practical training starting from basics to advanced testing techniques.</li>
                                <li>Best suitable for beginners to advanced level users and who learn faster when demonstrated.</li>
                                <li>Course content designed by considering current software testing technology and the job market.</li>
                                <li>Practical assignments at the end of every session.</li>
                                <li>Practical learning experience with live project work and examples.</li>

                            </ul>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">CURRICULUM</h2>
                        <div>
                            <p>The curriculum is empty</p>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Instructor</h2>
                        <div className="flex items-center">
                            <Avatar size={110} src="path_to_image.jpg" />
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold">Keny White</h3>
                                <p>Professor</p>
                                <p>Lorem ipsum dolor sit amet. Qui incidunt dolores non similique ducimus et debitis molestiae. Et autem quia eum reprehenderit voluptates est reprehenderit illo est enim perferendis est neque sunt. Nam amet sunt aut vero mollitia ut ipsum corporis vel facere eius et quia aspernatur qui fugiat repudiandae. Et officiis inventore et quis enim ut quaerat corporis sed reprehenderit odit sit saepe distinctio et accusantium repellendus ea enim harum.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <h2 className="font-semibold">Reviews</h2>
                        </div>

                        <div className="w-full md:w-1/2 pr-4">
                            <p className="text-2xl font-semibold mb-4">Average Rating</p>
                            <div className="flex items-center mb-4">
                                <div className="text-4xl font-bold mr-4">0</div>
                                <Rate disabled allowHalf defaultValue={0} />
                                <span className="ml-2">(0 ratings)</span>
                            </div>
                        </div>

                        {/* Detailed Rating Section */}
                        <div className="w-full md:w-1/2 pl-4 md:pl-0">
                            <div>
                                <p className="font-semibold">Detailed Rating</p>
                                <div className="space-y-2">
                                    {ratings.map((rating) => (
                                        <div key={rating.stars} className="flex items-center">
                                            <span className="w-6">{rating.stars}</span>
                                            <div className="w-full bg-gray-200 rounded-full h-4 mx-2">
                                                <div
                                                    className="bg-yellow-500 h-4 rounded-full"
                                                    style={{ width: `${rating.percentage}%` }}
                                                ></div>
                                            </div>
                                            <span>{rating.percentage}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sidebar" className="md:w-4/12 sticky-sidebar">
                    <div className="theiaStickySidebar">
                        <div className="course_right p-4">
                            <div>
                                <div className="course-thumbnail">
                                    <img fetchPriority="high" width="970" height="560" src="https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/04/courses-2.jpg" className="attachment-full size-full wp-post-image" alt="courses 2" title="courses 2" decoding="async" srcSet="https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/04/courses-2.jpg 970w, https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/04/courses-2-300x173.jpg 300w, https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/04/courses-2-768x443.jpg 768w, https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/04/courses-2-600x346.jpg 600w" sizes="(max-width: 970px) 100vw, 970px" />
                                </div>
                            </div>
                            <div className="course-payment">
                                <div className="course-price">
                                    <div className="value">$45.00</div>
                                </div>
                                <div className="lp-course-buttons">
                                    <form name="purchase-course" className="purchase-course" method="post" encType="multipart/form-data">
                                        <input type="hidden" name="purchase-course" />
                                        <button className="bg-blue-600 text-white">Buy Now</button>
                                    </form>

                                </div>
                            </div>
                            <div className="thim-course-info">
                                <h1 className="title">Course Features</h1>
                                <ul>
                                    <li className="lectures-feature">
                                        <span className="label">Lectures</span>
                                        <span className="value">0</span>
                                    </li>
                                    <li className="lectures-feature">
                                        <span className="label">Quizzes</span>
                                        <span className="value">0</span>
                                    </li>
                                    <li className="lectures-feature">
                                        <span className="label">Duration 54 hours</span>
                                    </li>
                                    <li className="lectures-feature">
                                        <span className="label"> Skill level All levels</span>
                                    </li>
                                    <li className="lectures-feature">
                                        <span className="label"> Language English</span>
                                    </li>
                                    <li className="lectures-feature">
                                        <span className="label">  Students</span>
                                        <span className="value">31</span>

                                    </li>
                                    <li className="lectures-feature">
                                        <span className="label">   Assessments</span>
                                        <span className="value">Yes</span>

                                    </li>
                                </ul>
                            </div>
                            <div className="social_share">Share:
                                <div className="facebook-social">
                                    <a href="" title="Facebook">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default CoursePage;
