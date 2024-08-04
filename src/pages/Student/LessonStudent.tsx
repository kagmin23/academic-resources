import {
    FileOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReadOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    session_list: Session[];
}

const LearnCourseDetail: React.FC = () => {
    const { lessonId } = useParams<{ id: string, lessonId?: string }>();
    const { courseId } = useParams<{ courseId?: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [collapsed, setCollapsed] = useState(false);
    const [firstLessonLoaded, setFirstLessonLoaded] = useState(false);
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
                if (lessonId) {
                    fetchLessonDetail(lessonId);
                } else if (data.session_list.length > 0 && data.session_list[0].lesson_list.length > 0) {
                    const firstLessonId = data.session_list[0].lesson_list[0]._id;
                    fetchLessonDetail(firstLessonId);
                    setFirstLessonLoaded(true); // Mark first lesson as loaded
                }
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
            setSelectedLesson(lesson.data);
        } catch (error) {
            message.error("Error fetching lesson details");
            console.error("Error fetching lesson details:", error);
        }
    };

    const handleLessonClick = async (lesson: Lesson) => {
        if (selectedLesson?._id !== lesson._id) {
            await fetchLessonDetail(lesson._id);
        }
        window.history.replaceState(null, '', `/student/student-learning/${courseId}/lesson/${lesson._id}`);
    };

    function getLessonIcon(lessonType: string) {
        switch (lessonType) {
            case "video":
                return <VideoCameraOutlined style={{ fontSize: '13px', color: '#1890ff' }} />;
            case "reading":
                return <ReadOutlined style={{ fontSize: '13px', color: '#52c41a' }} />;
            case "image":
                return <FileOutlined style={{ fontSize: '13px', color: '#faad14' }} />;
            default:
                return <FileOutlined style={{ fontSize: '13px', color: '#faad14' }} />;
        }
    }

    const convertToEmbedUrl = (url: string) => {
        const videoId = url.split("v=")[1];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    useEffect(() => {
        if (course && firstLessonLoaded) {
            const firstLesson = course.session_list[0].lesson_list[0];
            handleLessonClick(firstLesson);
        }
    }, [course, firstLessonLoaded]);

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Layout className="min-h-screen overflow-hidden bg-gray-100">
            <Header className="flex items-center px-4 bg-white border-b border-gray-200 shadow-md">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="mr-4 text-blue-500 hover:text-blue-700"
                />
                <div className="flex-1">
                    {selectedLesson && (
                        <Breadcrumb>
                            <Breadcrumb.Item className="text-lg text-blue-950">{course.name}</Breadcrumb.Item>
                        </Breadcrumb>
                    )}
                </div>
            </Header>
            <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    width={300}
                    className="bg-white border-r border-gray-200 shadow-md"
                    trigger={null}
                    style={{ overflowY: 'auto' }}
                >
                    <Menu
                        mode="inline"
                        defaultOpenKeys={[course.session_list[0]?._id]}
                        style={{ height: "100%", overflowY: 'auto' }}
                    >
                        {course.session_list.map((session) => (
                            <Menu.SubMenu key={session._id} title={session.name} icon={<ReadOutlined />}>
                                {session.lesson_list.map((lesson) => (
                                    <Menu.Item
                                        key={lesson._id}
                                        icon={getLessonIcon(lesson.lesson_type)}
                                        onClick={() => handleLessonClick(lesson)}
                                        className="hover:bg-blue-100"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{lesson.name}</span>
                                            <span className="text-xs text-gray-500">{lesson.full_time}mins</span>
                                        </div>
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        ))}
                    </Menu>
                </Sider>
                <Layout>
                    <Content className="p-6 bg-white rounded-lg shadow-lg" style={{ overflowY: 'auto' }}>
                        {selectedLesson ? (
                            <div className="p-6">
                                <h2 className="mb-4 text-3xl font-bold text-gray-900">{selectedLesson.name}</h2>
                                {selectedLesson.lesson_type === "video" && selectedLesson.video_url && (
                                    <div className="mb-4">
                                        <iframe
                                            width="100%"
                                            height="400px"
                                            src={convertToEmbedUrl(selectedLesson.video_url)}
                                            title={selectedLesson.name}
                                            frameBorder="0"
                                            allowFullScreen
                                            className="rounded-lg shadow-md"
                                        ></iframe>
                                    </div>
                                )}
                                {selectedLesson.lesson_type === "image" && selectedLesson.image_url && (
                                    <div className="mb-4">
                                        <img
                                            src={selectedLesson.image_url}
                                            alt={selectedLesson.name}
                                            className="h-auto max-w-full rounded-lg shadow-md"
                                        />
                                    </div>
                                )}
                                {selectedLesson.description && (
                                    <div className="mt-4 text-lg text-gray-700">
                                        {selectedLesson.description}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center text-gray-600">
                                No lesson selected
                            </div>
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LearnCourseDetail;
