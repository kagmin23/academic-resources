import React, { useState } from 'react';
import { Menu, Card, Button, Modal, message } from 'antd';
import { FileOutlined, LockOutlined, CheckOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import { Typography } from 'antd';

const { Title, Text } = Typography;
const { SubMenu } = Menu;

interface Lesson {
  key: string;
  title: string;
  videoUrl: string;
  assignment: Assignment;
}

interface Assignment {
  key: string;
  title: string;
  duration: string;
}

interface Chapter {
  chapter: string;
  lessons: Lesson[];
}

const chapters: Chapter[] = [
  {
    chapter: 'Mở đầu',
    lessons: [
      {
        key: 'intro_1',
        title: '[Phải xem] Hướng dẫn cách học đúng',
        videoUrl: 'https://www.youtube.com/embed/ysjJlvQ3FFc?si=CkBTYOE7ExS8QmQY',
        assignment: {
          key: 'assignment_1',
          title: 'Assignment: Phản hồi về bài học mở đầu',
          duration: '60 minutes'
        }
      }
    ]
  },
  {
    chapter: 'Ôn tập kiến thức JavaScript cần thiết',
    lessons: [
      {
        key: 'js_1',
        title: 'Ôn tập kiến thức JavaScript cần thiết',
        videoUrl: 'https://www.youtube.com/embed/9QeNLypIiZs?si=5UtvJSlp2Z0n1a80',
        assignment: {
          key: 'assignment_2',
          title: 'Assignment: Kiểm tra kiến thức JavaScript cần thiết',
          duration: '60 minutes'
        }
      }
    ]
  },
  {
    chapter: 'TypeScript',
    lessons: [
      {
        key: 'ts_1',
        title: 'Tất cả kiến thức TypeScript cần dùng trong React',
        videoUrl: 'https://www.youtube.com/embed/sl3vJrgvU-U?si=qk15vIpibKttZvCr',
        assignment: {
          key: 'assignment_3',
          title: 'Assignment: Làm bài tập về TypeScript',
          duration: '60 minutes'
        }
      }
    ]
  },
  {
    chapter: 'Kiến thức về developer tool, Postman và API',
    lessons: [
      {
        key: 'dev_1',
        title: 'REST API là gì?',
        videoUrl: 'https://www.youtube.com/embed/TxW5bX4cYKk?si=u9Rh7tKwDbJLF-Af',
        assignment: {
          key: 'assignment_4',
          title: 'Assignment: Thực hành sử dụng Postman',
          duration: '60 minutes'
        }
      },
      {
        key: 'dev_2',
        title: 'Gọi API với XmlHttpRequest, Fetch, Axios',
        videoUrl: 'https://www.youtube.com/embed/mKxhexeVg50?si=j7NICFLdihawzkeA',
        assignment: {
          key: 'assignment_5',
          title: 'Assignment: Gọi API sử dụng Axios',
          duration: '60 minutes'
        }
      }
    ]
  },
  // Add more chapters and lessons here
];

const LessonStudent: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedAssignments, setCompletedAssignments] = useState<string[]>([]);

  const renderContent = (lesson: Lesson) => {
    return (
      <div>
        <iframe
          width="100%"
          height="360"
          src={lesson.videoUrl}
          title={`YouTube video player`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="mb-4"
        ></iframe>
        <div className="text-lg font-bold mt-4">Thông tin khóa học:</div>
        <ul className="list-disc pl-4 mt-2">
          {/* Other content */}
        </ul>
      </div>
    );
  };

  const handleLessonClick = (lesson: Lesson, chapterIndex: number, lessonIndex: number) => {
    if (lessonIndex > 0) {
      const previousLessonKey = chapters[chapterIndex]?.lessons[lessonIndex - 1]?.key;
      const assignmentKey = chapters[chapterIndex]?.lessons[lessonIndex - 1]?.assignment?.key;
      if (!completedLessons.includes(previousLessonKey) || !completedAssignments.includes(assignmentKey || '')) {
        message.warning('Bạn cần hoàn thành bài tập trước khi xem bài học tiếp theo.');
        return;
      }
    }
    setSelectedLesson(lesson);
    setCompletedLessons([...completedLessons, lesson.key]);
  };

  const handleAssignmentClick = (assignment: Assignment) => {
    Modal.confirm({
      title: 'Xác nhận',
      content: 'Bạn có chắc chắn muốn hoàn thành bài tập này?',
      onOk: () => {
        setCompletedAssignments([...completedAssignments, assignment.key]);
        message.success('Bạn đã hoàn thành bài tập!');
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row p-4">
      <div className="w-full lg:w-2/3 p-4">
        <Title level={2}>NodeJs Super</Title>
        <Text>Bởi: Du Thanh Dược</Text> <br />
        <Text>Cập nhật: 06/2024</Text>
        <div className="my-4">
          <div>
            <h1 className="text-2xl font-bold mb-4">{selectedLesson?.title}</h1>
            {selectedLesson && renderContent(selectedLesson)}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 p-4 bg-gray-100">
        <Card>
          <Menu
            mode="inline"
            className="mb-4"
          >
            {chapters.map((chapter, chapterIndex) => (
              <SubMenu key={`lesson_${chapterIndex}`} title={`${chapterIndex + 1}. ${chapter.chapter}`}>
                {chapter.lessons.map((lesson, lessonIndex) => (
                  <Menu.Item
                    key={lesson.key}
                    icon={
                      completedLessons.includes(lesson.key) ? (
                        <CheckOutlined />
                      ) : (
                        lessonIndex > 0 && !completedAssignments.includes(chapter.lessons[lessonIndex - 1]?.assignment?.key || '') ? (
                          <LockOutlined />
                        ) : null
                      )
                    }
                    onClick={() => handleLessonClick(lesson, chapterIndex, lessonIndex)}
                  >
                    {lesson.title}
                  </Menu.Item>
                ))}
                {chapter.lessons[chapter.lessons.length - 1].assignment && (
                  <Menu.Item
                    key={chapter.lessons[chapter.lessons.length - 1].assignment.key}
                    icon={<FileOutlined />}
                    onClick={() => handleAssignmentClick(chapter.lessons[chapter.lessons.length - 1].assignment as Assignment)}
                  >
                    {chapter.lessons[chapter.lessons.length - 1].assignment.title}
                  </Menu.Item>
                )}
              </SubMenu>
            ))}
          </Menu>
        </Card>
      </div>
    </div>
  );
};

export default LessonStudent;
