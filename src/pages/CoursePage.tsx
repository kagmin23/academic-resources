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
            <div className="coure-info-top bg-[#333333] text-[#fff] py-14">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:-mx-4">
                        <div className="course-info-left w-full md:w-2/3 md:px-4 mb-8 md:mb-0">
                            <h1 className="entry-title text-4xl font-semibold mb-4 text-left font-serif">Introduction to Marketing</h1>
                            <p className="text-lg mb-6 text-left font-sans text-gray-300">This tutorial will introduce you to PHP, a server-side scripting language you can use to make dynamic websites and web applications.</p>
                            <div className="course-meta course-meta-single flex flex-wrap items-start overflow-hidden relative mb-8 space-y-6 md:space-y-0 md:space-x-8 text-left">

                                <div className="course-author flex flex-col md:flex-row md:items-start space-x-4">
                                    <img alt="User Avatar" className="avatar h-24 w-24 rounded-full" src="https://eduma.thimpress.com/demo-udemy/wp-content/uploads/learn-press-profile/7/e5c6a6fb8aa3864eacaec471611e0470.jpeg" />
                                    <div className="author-contain text-left">
                                        <label className="block text-lg" itemProp="jobTitle">Teacher</label>
                                        <div className="value text-lg font-medium">
                                            <a href="https://eduma.thimpress.com/demo-udemy/instructor-4/keny/">
                                                <span className="instructor-display-name">Keny White</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="course-categories flex flex-col md:items-start text-left">
                                    <label className="block text-lg">Categories</label>
                                    <div className="value text-lg font-medium">
                                        <span className="cat-links"><a href="https://eduma.thimpress.com/demo-udemy/course-category/marketing/" rel="tag">Marketing</a></span>
                                    </div>
                                </div>

                                <div className="meta-item meta-item-review flex flex-col items-start">
                                    <div className="meta-item__value">
                                        <label className="block text-lg">Review</label>
                                        <div className="review-stars-rated flex relative " title="0 out of 5 stars">
                                            {Array(5).fill(0).map((_, index) => (
                                                <div key={index} className="review-star relative ml-1.5">
                                                    <em className="far lp-review-svg-star ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                        </svg>
                                                    </em>
                                                    <em className="fas lp-review-svg-star absolute top-0 left-0 w-0 text-yellow-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                        </svg>
                                                    </em>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-4 md:flex">
                <div className="md:w-8/12">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 font-serif mt-20">OVERVIEW</h2>
                        <div>
                            <h4 className="text-3xl font-bold font-serif">COURSE DESCRIPTION</h4>
                            <p className='text-xl mt-4 text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            <h4 className="text-3xl font-bold font-serif mt-7">CERTIFICATION</h4>
                            <p className='text-xl mt-4 text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            <h4 className="text-3xl font-bold font-serif mt-7">LEARNING OUTCOMES</h4>
                            <ul className="list-disc pl-5 text-xl mt-4 text-gray-600">
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
                        <h2 className="text-3xl font-bold font-serif mt-10">CURRICULUM</h2>
                        <div>
                            <p className='text-xl mt-4 text-gray-600'>The curriculum is empty</p>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold font-serif mt-10">INSTRUCTOR</h2>
                        <div className="flex items-center mt-10">
                            <Avatar src="path_to_image.jpg" className="w-96 h-32 font-bold" />
                            <div className="ml-8">
                                <h3 className="text-xl font-bold">Keny White</h3>
                                <p className='text-gray-400 text-xl'>Professor</p>
                                <p className='text-gray-600 text-xl'>Lorem ipsum dolor sit amet. Qui incidunt dolores non similique ducimus et debitis molestiae. Et autem quia eum reprehenderit voluptates est reprehenderit illo est enim perferendis est neque sunt. Nam amet sunt aut vero mollitia ut ipsum corporis vel facere eius et quia aspernatur qui fugiat repudiandae. Et officiis inventore et quis enim ut quaerat corporis sed reprehenderit odit sit saepe distinctio et accusantium repellendus ea enim harum.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <h2 className="text-3xl font-bold font-serif mt-10 mb-10">REVIEWS</h2>
                        </div>

                        <div className="w-full md:w-1/2 pr-4">
                            <p className="text-2xl mb-4 ">Average Rating</p>
                            <div className="flex items-center mb-4 flex-col">
                                <div className="text-8xl font-semibold mr-4 mb-7">0</div>
                                <div className="review-stars-rated flex relative " title="0 out of 5 stars">
                                            {Array(5).fill(0).map((_, index) => (
                                                <div key={index} className="review-star relative ml-1.5">
                                                    <em className="far lp-review-svg-star ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                        </svg>
                                                    </em>
                                                    <em className="fas lp-review-svg-star absolute top-0 left-0 w-0 text-yellow-400">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                        </svg>
                                                    </em>
                                                </div>
                                            ))}
                                        </div>
                                <span className="ml-2 text-xl">0 ratings</span>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 pl-4 md:pl-0">
                            <div>
                                <p className="text-2xl">Detailed Rating</p>
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

                <div id="sidebar" className="md:w-4/12 sticky-sidebar top-20 h-full overflow-y-auto mt-8 md:mt-0">
                    <div className="theiaStickySidebar">
                        <div className="course_right p-4">
                            <div>
                                <div className="course-thumbnail">
                                    <img fetchPriority="high" width="970" height="560" src="https://eduma.thimpress.com/demo-udemy/wp-content/uploads/sites/93/2022/04/courses-2.jpg" className="w-full rounded-lg" alt="courses 2" title="courses 2" decoding="async" />
                                </div>
                            </div>
                            <div className="course-payment mt-4">
                                <div className="course-price mb-5">
                                    <div className="value text-4xl text-gray-600 font-bold">$45.00</div>
                                </div>
                                <div className="lp-course-buttons mt-4">
                                    <form name="purchase-course" className="purchase-course" method="post" encType="multipart/form-data">
                                        <input type="hidden" name="purchase-course" />
                                        <button className="bg-blue-600 text-white w-[100%] py-4 text-xl font-bold hover:bg-blue-800">BUY NOW</button>
                                    </form>
                                </div>
                            </div>
                            <div className="mt-6 ">
                                <h1 className="text-3xl font-bold font-serif mt-10">Course Features</h1>
                                <ul className="mt-4 text-gray-600 text-xl">
                                    <li className="lectures-feature flex justify-between">
                                        <span className="label">Lectures</span>
                                        <span className="value">0</span>
                                    </li>
                                    <li className="lectures-feature flex justify-between">
                                        <span className="label">Quizzes</span>
                                        <span className="value">0</span>
                                    </li>
                                    <li className="lectures-feature">
                                        <span className="label">Duration 54 hours</span>
                                    </li>
                                    <li className="lectures-feature">
                                        <span className="label">Skill level All levels</span>
                                    </li>
                                    <li className="lectures-feature">
                                        <span className="label">Language English</span>
                                    </li>
                                    <li className="lectures-feature flex justify-between">
                                        <span className="label">Students</span>
                                        <span className="value">31</span>
                                    </li>
                                    <li className="lectures-feature flex justify-between">
                                        <span className="label">Assessments</span>
                                        <span className="value">Yes</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="social_share mt-6">Share:
                                <a href="https://www.facebook.com/profile.php?id=100088863845747" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transform hover:scale-110 transition-transform duration-300 p-2 border border-white rounded-full">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-4xl text-[#4B5563] hover:text-blue-700" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default CoursePage;