import React, { useState } from 'react';
import { Menu, Card } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const { SubMenu } = Menu;

interface Lesson {
  key: string;
  title: string;
  videoUrl: string;
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
        videoUrl: 'https://www.youtube.com/embed/ysjJlvQ3FFc?si=CkBTYOE7ExS8QmQY'
      }
    ]
  },
  { 
    chapter: 'Ôn tập kiến thức JavaScript cần thiết', 
    lessons: [
      {
        key: 'js_1',
        title: 'Ôn tập kiến thức JavaScript cần thiết',
        videoUrl: 'https://www.youtube.com/embed/9QeNLypIiZs?si=5UtvJSlp2Z0n1a80'
      }
    ]
  },
  { 
    chapter: 'TypeScript', 
    lessons: [
      {
        key: 'ts_1',
        title: 'Tất cả kiến thức TypeScript cần dùng trong React',
        videoUrl: 'https://www.youtube.com/embed/sl3vJrgvU-U?si=qk15vIpibKttZvCr'
      }
    ]
  },
  { 
    chapter: 'Kiến thức về developer tool, Postman và API', 
    lessons: [
      {
        key: 'dev_1',
        title: 'REST API là gì?',
        videoUrl: 'https://www.youtube.com/embed/TxW5bX4cYKk?si=u9Rh7tKwDbJLF-Af'
      },
      {
        key: 'dev_2',
        title: 'Gọi API với XmlHttpRequest, Fetch, Axios',
        videoUrl: 'https://www.youtube.com/embed/mKxhexeVg50?si=j7NICFLdihawzkeA'
      }
    ]
  },
  { 
    chapter: 'NodeJs và Webpack cơ bản đến nâng cao', 
    lessons: [
      {
        key: 'nodejs_webpack_1',
        title: 'NodeJs và Webpack cơ bản đến nâng cao',
        videoUrl: 'https://www.youtube.com/embed/5SU6P-cqoJw?si=Kpld8PIrV2wnjEpa'
      }
    ]
  },
  { 
    chapter: 'Git căn bản đến nâng cao', 
    lessons: [
      {
        key: 'git_1',
        title: 'Git căn bản đến nâng cao',
        videoUrl: 'https://www.youtube.com/embed/ViPTAlLPnV4?si=_Je-l-HY2PmFRrM-'
      }
    ]
  },
  { 
    chapter: 'Kiến thức Authentication', 
    lessons: [
      {
        key: 'auth_1',
        title: 'Kiến thức Authentication',
        videoUrl: 'https://www.youtube.com/embed/9QeNLypIiZs?si=e8xUKFV3QqciGcUX'
      }
    ]
  }
];

const assignments: Assignment[] = [
  { key: 'assignment_1', title: 'Certificate On Theme Development 1', duration: '60 minutes' },
  { key: 'assignment_2', title: 'Certificate On Theme Development 2', duration: '60 minutes' }
];

const LessonStudent: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(chapters[0].lessons[0]);

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
          <li>Mua 1 lần, học trọn đời</li>
          <li>Cập nhật khóa học liên tục</li>
          <li>Video chất lượng 1080p, 1440p</li>
          <li>Học trên mọi thiết bị</li>
          <li>Group hỏi đáp với mentor</li>
          <li>Hỗ trợ fix bug khi học</li>
          <li>Cung cấp doc, source code Github tập đầy đủ</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row p-4">
      <div className="w-full lg:w-2/3 p-4">
        <Title level={2}>NodeJs Super</Title>
        <Text>Bởi: Du Thanh Dược</Text> <br />
        <Text>Cập nhật: 06/2024</Text>
        <div className="my-4">
          <div>
            <h1 className="text-2xl font-bold mb-4">{selectedLesson.title}</h1>
            {renderContent(selectedLesson)}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 p-4 bg-gray-100">
        <Card>
          <Menu
            mode="inline"
            defaultSelectedKeys={[chapters[0].lessons[0].key]}
            className="mb-4"
            onClick={({ key }) => {
              const selected = chapters.flatMap(chapter => chapter.lessons).find((lesson) => lesson.key === key);
              if (selected) setSelectedLesson(selected);
            }}
          >
            <SubMenu key="lesson" title="Lessons" icon={<FileOutlined />}>
              {chapters.map((chapter, index) => (
                <SubMenu key={`lesson_${index}`} title={`${index + 1}. ${chapter.chapter}`}>
                  {chapter.lessons.map((lesson) => (
                    <Menu.Item key={lesson.key}>
                      {lesson.title}
                    </Menu.Item>
                  ))}
                </SubMenu>
              ))}
            </SubMenu>
            <SubMenu key="assignment" title="Assignments" icon={<FileOutlined />}>
              {assignments.map((assignment) => (
                <Menu.Item key={assignment.key}>
                  {assignment.title}
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
        </Card>
      </div>
    </div>
  );
};

export default LessonStudent;

