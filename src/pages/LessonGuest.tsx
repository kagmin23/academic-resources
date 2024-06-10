import React, { useState } from 'react';
import { Menu } from 'antd';
import { FileOutlined, LockOutlined, CheckOutlined } from '@ant-design/icons'; // Import biểu tượng

const { SubMenu } = Menu;

const lessons = [
  { key: 'lesson1', title: 'Getting Started', duration: '30 minutes', preview: true },
  { key: 'lesson2', title: 'Content Management', duration: '30 minutes' },
  { key: 'lesson3', title: 'Course Download', duration: '30 minutes' },
  { key: 'lesson4', title: 'Course Download 02', duration: '30 minutes' },
  { key: 'lesson5', title: 'Contextualising Sustainability for a Changing World', duration: '10 minutes' },
];

const assignments = [
  { key: 'assignment1', title: 'Certificate On Theme Development 01', duration: '10 minutes', preview: true },
  { key: 'assignment2', title: 'Certificate On Theme Development 02', duration: '30 minutes' },
];

const LessonGuest: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState(lessons[0].title);

  const handleClick = (e: any) => {
    const lesson = lessons.find(lesson => lesson.key === e.key);
    if (lesson) {
      setSelectedLesson(lesson.title);
    }
  };

  const renderContent = (title: string) => {
    if (title === 'Getting Started') {
      return (
        <ul className="list-disc ml-5">
          <li className="flex items-start">
            <CheckOutlined className="mr-2 text-green-500" />
            Biết cách xây dựng giao diện web với HTML, CSS
          </li>
          <li className="flex items-start">
            <CheckOutlined className="mr-2 text-green-500" />
            Biết cách phân tích giao diện website
          </li>
          <li className="flex items-start">
            <CheckOutlined className="mr-2 text-green-500" />
            Biết cách đặt tên class CSS theo chuẩn BEM
          </li>
          <li className="flex items-start">
            <CheckOutlined className="mr-2 text-green-500" />
            Biết cách làm giao diện web responsive
          </li>
          <li className="flex items-start">
            <CheckOutlined className="mr-2 text-green-500" />
            Làm chủ Flexbox khi dựng bố cục website
          </li>
          <li className="flex items-start">
            <CheckOutlined className="mr-2 text-green-500" />
            Sở hữu 2 giao diện web khi học xong khóa học
          </li>
          <li className="flex items-start">
            <CheckOutlined className="mr-2 text-green-500" />
            Biết cách tự tạo động lực cho bản thân
          </li>
          <li className="flex items-start">
            <CheckOutlined className="mr-2 text-green-500" />
            Biết cách tự học những kiến thức mới
          </li>
          <li className="flex items-start">
            <CheckOutlined className="mr-2 text-green-500" />
            Học được cách làm UI chỉn chu, kỹ tính
          </li>
          <li className="flex items-start">
            <CheckOutlined className="mr-2 text-green-500" />
            Nhận chứng chỉ khóa học do F8 cấp
          </li>
        </ul>
      );
    }
    return (
      <>
        <p>
          Coding for beginners might seem hard. However, starting with the basics is a great way to familiarise yourself with the syntax and the process of what it takes to create a website. This course teaches you HTML and CSS.
        </p>
        <p>
          Two programming languages that are essential to master when you are creating your website. This coding for beginners course incorporates three aspects of learning. You will be able to learn HTML & CSS theory and immediately apply the knowledge you’ve learned to.
        </p>
      </>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 p-4 bg-gray-100">
        <Menu
          mode="inline"
          defaultSelectedKeys={[lessons[0].key]}
          onClick={handleClick}
          className="h-full"
        >
          <SubMenu key="sub1" title="Lesson" icon={<FileOutlined />}>
            {lessons.map(lesson => (
              <Menu.Item key={lesson.key} icon={lesson.preview ? <FileOutlined /> : <LockOutlined />} className="h-24 flex items-center">
                <div className="w-full">
                  <div className="text-base">{lesson.title}</div>
                  <div className="text-sm text-gray-500">{lesson.duration}</div>
                </div>
              </Menu.Item>
            ))}
          </SubMenu>
          <SubMenu key="sub2" title="Assignment" icon={<FileOutlined />}>
            {assignments.map(assignment => (
              <Menu.Item key={assignment.key} icon={assignment.preview ? <FileOutlined /> : <LockOutlined />} className="h-24 flex items-center">
                <div className="w-full">
                  <div className="text-base">{assignment.title}</div>
                  <div className="text-sm text-gray-500">{assignment.duration}</div>
                </div>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </div>
      <div className="w-full lg:w-2/3 p-4">
        <h1 className="text-2xl font-bold mb-4">{selectedLesson}</h1>
        {renderContent(selectedLesson)}
      </div>
    </div>
  );
};

export default LessonGuest;
