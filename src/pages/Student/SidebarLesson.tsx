import React, { useEffect, useState } from 'react';
import { Menu, Card, message ,Modal} from 'antd';
import { FileOutlined, LockOutlined, CheckOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
const { SubMenu } = Menu;

interface Lesson {
  id: number;
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
  id: number;
//   href: string;
  lessons: Lesson[];
}

const chapters: Chapter[] = [
  { id:1,
    
    chapter: 'Mở đầu',
    lessons: [
      { 
        id:1,
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
  { id:2,
    chapter: 'Ôn tập kiến thức JavaScript cần thiết',
    lessons: [
      { id:2,
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
  { id:3,
    chapter: 'TypeScript',
    lessons: [
      { id:3,
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
  { id:4,
    chapter: 'Kiến thức về developer tool, Postman và API',
    lessons: [
      { id:4,
        key: 'dev_1',
        title: 'REST API là gì?',
        videoUrl: 'https://www.youtube.com/embed/TxW5bX4cYKk?si=u9Rh7tKwDbJLF-Af',
        assignment: {
          key: 'assignment_4',
          title: 'Assignment: Thực hành sử dụng Postman',
          duration: '60 minutes'
        }
      },
      { id:5,
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

const SidebarLesson: React.FC = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedAssignments, setCompletedAssignments] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleLessonClick = (lesson: Lesson, chapterIndex: number, lessonIndex: number) => {
    if (lessonIndex > 0) {
      const previousLessonKey = chapters[chapterIndex]?.lessons[lessonIndex - 1]?.key;
      const assignmentKey = chapters[chapterIndex]?.lessons[lessonIndex - 1]?.assignment?.key;
      if (!completedLessons.includes(previousLessonKey) || !completedAssignments.includes(assignmentKey || '')) {
        message.warning('Bạn cần hoàn thành bài tập trước khi xem bài học tiếp theo.');
        return;
      }
    }
    setCompletedLessons([...completedLessons, lesson.key]);
    navigate(`/student/router-lesson/lesson-student/${lesson.id}`);
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
    <div className="w-full lg:w-1/3 p-4 bg-gray-100">
      <Card>
        <Menu mode="inline" className="mb-4">
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
  );
};

export default SidebarLesson;
