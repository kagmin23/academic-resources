// import {
//     EyeOutlined,
//     FileOutlined,
//     MenuFoldOutlined,
//     MenuUnfoldOutlined,
//     ReadOutlined,
//     VideoCameraOutlined
// } from '@ant-design/icons';
// import { Breadcrumb, Button, Layout, Menu, Spin, message } from "antd";
// // import parse from 'html-react-parser';
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getLesson } from 'services/Instructor/lessonApiService';
// import { getCourseDetail } from "services/UserClient/clientApiService";
// import "tailwindcss/tailwind.css";

// const { Sider, Content, Header } = Layout;

// interface Lesson {
//     _id: string;
//     name: string;
//     lesson_type: string;
//     full_time: number;
//     position_order: number;
//     video_url?: string;
//     image_url?: string;
//     description?: string;
// }

// interface Session {
//     _id: string;
//     name: string;
//     position_order: number;
//     full_time: number;
//     lesson_list: Lesson[];
// }

// interface Course {
//     _id: string;
//     name: string;
//     session_list: Session[];
// }

// const LearnCourseDetail: React.FC = () => {
//     const { lessonId } = useParams<{ id: string, lessonId?: string }>();
//     const { courseId } = useParams<{ courseId?: string }>();
//     const [course, setCourse] = useState<Course | null>(null);
//     const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
//     const [collapsed, setCollapsed] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCourseDetailUser = async () => {
//             if (!courseId) {
//                 message.error("Course ID is missing");
//                 return;
//             }
//             try {
//                 const data = await getCourseDetail(courseId);
//                 setCourse(data);
//                 if (lessonId) {
//                     fetchLessonDetail(lessonId);
//                 } else if (data.session_list.length > 0 && data.session_list[0].lesson_list.length > 0) {
//                     const firstLessonId = data.session_list[0].lesson_list[0]._id;
//                     fetchLessonDetail(firstLessonId);
//                 }
//             } catch (error) {
//                 message.error("Error fetching course details!");
//                 console.error("Error fetching course details:", error);
//             }
//         };

//         fetchCourseDetailUser();
//     }, [courseId, lessonId, navigate]);

//     const fetchLessonDetail = async (lessonId: string) => {
//         try {
//             const lesson = await getLesson(lessonId);
//             setSelectedLesson(lesson);
//             console.log("setSelectedLesson",selectedLesson)
//         } catch (error) {
//             message.error("Error fetching lesson details");
//             console.error("Error fetching lesson details:", error);
//         }
//     };

//     const handleLessonClick = async (lesson: Lesson) => {
//         await fetchLessonDetail(lesson._id);
//         console.log('lesson', lesson)
//         navigate(`/student/student-learning/${courseId}/lesson/${lesson._id}`);
//     };
//     // const handleLessonClick = async(lessonItem: Lesson) => {
//     //     await fetchLessonDetail(lessonItem._id);
//     // };

//     function getLessonIcon(lessonType: string) {
//         switch (lessonType) {
//             case "video":
//                 return <VideoCameraOutlined />;
//             case "reading":
//                 return <ReadOutlined />;
//             case "image":
//                 return <FileOutlined />;
//             default:
//                 return <EyeOutlined />;
//         }
//     }

//     if (!course) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <Spin size="large" />
//             </div>
//         );
//     }

//     return (
//         <Layout className="min-h-screen overflow-auto">
//             <Header className="flex items-center px-4 bg-white shadow-md">
//                 <Button
//                     type="text"
//                     icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//                     onClick={() => setCollapsed(!collapsed)}
//                     className="mr-4"
//                 />
//                 <div className="flex-1">
//                     {selectedLesson && (
//                         <Breadcrumb>
//                             <Breadcrumb.Item>{course.name}</Breadcrumb.Item>
//                         </Breadcrumb>
//                     )}
//                 </div>
//             </Header>
//             <Layout>
//                 <Sider
//                     collapsible
//                     collapsed={collapsed}
//                     width={300}
//                     className="overflow-auto bg-white shadow-md"
//                     trigger={null}
//                 >
//                     <Menu
//                         mode="inline"
//                         defaultOpenKeys={[course.session_list[0]?._id]}
//                         style={{ height: "100%" }}
//                     >
//                         {course.session_list.map((session) => (
//                             <Menu.SubMenu key={session._id} title={session.name}>
//                                 {session.lesson_list.map((lesson) => (
//                                     <Menu.Item
//                                         key={lesson._id}
//                                         icon={getLessonIcon(lesson.lesson_type)}
//                                         onClick={() => handleLessonClick(lesson)}
//                                     >
//                                         {lesson.name}
//                                     </Menu.Item>
//                                 ))}
//                             </Menu.SubMenu>
//                         ))}
//                     </Menu>
//                 </Sider>
//                 <Layout>
//                     <Content className="p-6 bg-gray-100">
//                         {selectedLesson ? (
//                             <div className="p-6 bg-white rounded-lg shadow-lg">
//                                 <h2 className="mb-4 text-3xl font-bold">{selectedLesson.name}</h2>
//                                 {selectedLesson.lesson_type === "video" && selectedLesson.video_url && (
//                                     <div className="mb-4">
//                                         <iframe
//                                             width="100%"
//                                             height="400px"
//                                             src={selectedLesson.video_url}
//                                             title={selectedLesson.name}
//                                             frameBorder="0"
//                                             allowFullScreen
//                                             className="rounded-lg"
//                                         ></iframe>
//                                     </div>
//                                 )}
//                                 {selectedLesson.lesson_type === "image" && selectedLesson.image_url && (
//                                     <div className="mb-4">
//                                         <img
//                                             src={selectedLesson.image_url}
//                                             alt={selectedLesson.name}
//                                             className="h-auto max-w-full rounded-lg"
//                                         />
//                                     </div>
//                                 )}
//                                 {selectedLesson.description && (
//                                     <div className="mt-4 text-lg">
//                                         {/* {parse(selectedLesson.description)} */}
//                                         {selectedLesson.description}
//                                     </div>
//                                 )}
//                             </div>
//                         ) : (
//                             <div>No lesson selected</div>
//                         )}
//                     </Content>
//                 </Layout>
//             </Layout>
//         </Layout>
//     );
// };

// export default LearnCourseDetail;
import {
    EyeOutlined,
    FileOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReadOutlined,
    VideoCameraOutlined,
    ReconciliationOutlined 
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLesson } from 'services/Instructor/lessonApiService';
import { getCourseDetail } from "services/UserClient/clientApiService";
import "tailwindcss/tailwind.css";

const { Sider, Content, Header } = Layout;

interface Lesson {
    _id: string;
    name: string;
    lesson_type: string;
    full_time: number;
    position_order: number;
    video_url?: string;
    image_url?: string;
    description?: string;
}

interface Session {
    _id: string;
    name: string;
    position_order: number;
    full_time: number;
    lesson_list: Lesson[];
}

interface Course {
    _id: string;
    name: string;
    description:string;
    video_url:string;
    session_list: Session[];
}

const LearnCourseDetail: React.FC = () => {
    const { lessonId } = useParams<{ id: string, lessonId?: string }>();
    const { courseId } = useParams<{ courseId?: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchCourseDetailUser = async () => {
            if (!courseId) {
                message.error("Course ID is missing");
                return;
            }
            try {
                const data = await getCourseDetail(courseId);
                setCourse(data);
                // if (lessonId) {
                //     console.log("first", lessonId)
                //     fetchLessonDetail(lessonId);
                // } else if (data.session_list.length > 0 && data.session_list[0].lesson_list.length > 0) {
                //     const firstLessonId = data.session_list[0].lesson_list[0]._id;
                //     fetchLessonDetail(firstLessonId);
                // }
                
            } catch (error) {
                message.error("Error fetching course details!");
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourseDetailUser();
    }, [courseId, lessonId]);

 

    const fetchLessonDetail = async (lessonId: string) => {
        try {
            const lesson = await getLesson(lessonId);
            setSelectedLesson(lesson);
            // console.log("setSelectedLesson", selectedLesson);
        } catch (error) {
            message.error("Error fetching lesson details");
            console.error("Error fetching lesson details:", error);
        }
    };

    const handleLessonClick = async (lesson: Lesson) => {
        await fetchLessonDetail(lesson._id);
        console.log('lesson', lesson);
        setSelectedLesson(lesson);
        navigate(`/student/student-learning/${courseId}/lesson/${lesson._id}`);

    };

    function getLessonIcon(lessonType: string) {
        switch (lessonType) {
            case "video":
                return <VideoCameraOutlined />;
            case "text":
                return <ReadOutlined />;
            case "image":
                return <FileOutlined />;
            default:
                return <EyeOutlined />;
        }
    }
    
    const handleIntroduceClick = () => {
        setSelectedLesson(null); 
        navigate(`/student/student-learning/${courseId}/lesson/`);
    };

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Layout className="min-h-screen overflow-auto">
            <Header className="flex items-center px-4 bg-white shadow-md">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="mr-4"
                />
                <div className="flex-1">
                    {selectedLesson && (
                        <Breadcrumb>
                            <Breadcrumb.Item>{course.name}</Breadcrumb.Item>
                        </Breadcrumb>
                    )}
                </div>
            </Header>
            <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    width={300}
                    className="overflow-auto bg-white shadow-md"
                    trigger={null}
                >
                    <Menu
    mode="inline"
    defaultOpenKeys={[course.session_list[0]?._id]}
    style={{ height: "100%" }}
>
    <Menu.Item
        key="introduce"
        icon={<ReconciliationOutlined />}
        onClick={handleIntroduceClick}
    >
        Introduce
    </Menu.Item>
    {course.session_list.map((session) => (
        <Menu.SubMenu key={session._id} title={session.name}>
            {session.lesson_list.map((lesson) => (
                <Menu.Item
                    key={lesson._id}
                    icon={getLessonIcon(lesson.lesson_type)}
                    onClick={() => handleLessonClick(lesson)}
                >
                    {lesson.name}
                </Menu.Item>
            ))}
        </Menu.SubMenu>
    ))}
</Menu>

                </Sider>
                <Layout>
                    <Content className="p-4 bg-gray-100">
                        {selectedLesson ? (
                            <div className="p-6 bg-white rounded-lg shadow-lg">
                                <h2 className="mb-4 text-3xl font-bold">{selectedLesson.name}</h2>
                                <p><strong>Lesson Type:</strong> {selectedLesson.lesson_type}</p>
                                <p><strong>Lesson Type:</strong> {selectedLesson.image_url}</p>
                                {selectedLesson.lesson_type === "video" && selectedLesson.video_url && (
                                    <div className="mb-4">
                                        <iframe
                                            width="100%"
                                            height="400px"
                                            src={selectedLesson.video_url}
                                            title={selectedLesson.name}
                                            frameBorder="0"
                                            allowFullScreen
                                            className="rounded-lg"
                                        ></iframe>
                                    </div>
                                )}
                                {selectedLesson.lesson_type === "image" && selectedLesson.image_url && (
                                    <div className="mb-4">
                                        <img
                                            src={selectedLesson.image_url}
                                            alt={selectedLesson.name}
                                            className="h-auto max-w-full rounded-lg"
                                        />
                                    </div>
                                )}
                                {selectedLesson.lesson_type === "text" && selectedLesson.description && (
                                    <div className="mt-4 text-lg text-black">
                                        
                                        {selectedLesson.description}
                                    </div>
                                )}
                                
                            </div>
                        ) : (
                            <div>
                                 <div className="mb-6 p-8 bg-white rounded-lg shadow-md">
                             <h1 className="text-2xl font-bold mb-2">Name Course: {course.name}</h1>
                              
                                {course.video_url && (
                                <div className="mb-4 ">
                                
                                    <iframe
                                        width="100%"
                                        height="400px"
                                        src={course.video_url}
                                        title={course.name}
                                        frameBorder="0"
                                        allowFullScreen
                                        className="rounded-lg"
                                    ></iframe>
                                </div>
                                
                            )}
                            <p className="text-lg mb-2"><strong>Description:</strong> {course.description}</p>
                        </div>


                                
                            </div>
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LearnCourseDetail;