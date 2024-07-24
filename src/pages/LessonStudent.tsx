import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const { Title, Text } = Typography;

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
];

const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const lesson = chapters.flatMap(chapter => chapter.lessons).find(lesson => lesson.id.toString() === id);
    setSelectedLesson(lesson || null);
  }, [id]);

  const renderContent = (lesson: Lesson) => {
    return (
      <div>
        <iframe
          width="100%"
          height="470"
          src={lesson.videoUrl}
          title={`YouTube video player`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="mb-6"
        ></iframe>
        <div className="mt-4 text-lg font-bold">Thông tin khóa học:</div>
        <ul className="pl-4 mt-2 list-disc">
          {/* Other content */}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div className="w-full px-6">
        {/* <Title level={2}>NodeJs Super</Title> */}
        
        <div className="my-4">
          <div>
            <h1 className="mb-4 text-2xl font-bold">{selectedLesson?.title}</h1>
            {selectedLesson && renderContent(selectedLesson)}
          </div>
        </div>
        <Text>Bởi: Du Thanh Dược</Text> <br />
        <Text>Cập nhật: 06/2024</Text>
      </div>
    </div>
  );
};

export default LessonDetail;
