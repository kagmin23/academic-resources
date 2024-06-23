import { FilterOutlined, HeartOutlined, HistoryOutlined, ReadOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Card, Col, DatePicker, Input, Layout, Row, Space } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

interface Certificate {
    id: number;
    image: string;
    title: string;
    finishDate: string;
  }

  const courses: Certificate[] = [
    {
      id: 1,
      image: 'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title: 'Course 1',
      finishDate: '2022-10-3'
    },
    {
      id: 2,
      image: 'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title: 'Course 2',
      finishDate: '2022-10-3'
    },
    {
      id: 3,
      image: 'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title: 'Course 3',
      finishDate: '2022-10-3'
    },
    {
      id: 4,
      image: 'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title: 'Course 4',
      finishDate: '2022-10-3'
    },
    {
      id: 5,
      image: 'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title: 'Course 5',
      finishDate: '2022-10-3'
    },
    {
      id: 6,
      image: 'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title: 'Course 6',
      finishDate: '2022-10-3'
    },
    {
      id: 7,
      image:'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title:'Course 7',
      finishDate: '2022-10-3'
    },
    {
      id: 8,
      image:'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title:'Course 7',
      finishDate: '2022-10-3'
    },
    {
      id: 9,
      image:'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title:'Course 7',
      finishDate: '2022-10-3'
    },
    {
      id: 10,
      image:'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title:'Course 7',
      finishDate: '2022-10-3'
    },
    {
      id: 11,
      image:'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title:'Course 7',
      finishDate: '2022-10-3'
    },
    {
      id: 12,
      image:'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title:'Course 7',
      finishDate: '2022-10-3'
    },
    {
      id: 13,
      image:'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title:'Course 7',
      finishDate: '2022-10-3'
    },]

const Certificate = () => {
    const { RangePicker } = DatePicker;
  return (
   <Layout>
   <div className="p-5 ">
        <div className="py-5">
        <h1 className="text-lg font-bold float-start sm:text-2xl ">
          <ReadOutlined className="mr-2"></ReadOutlined> Your Certificates
        </h1>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          /* value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} */
          className="w-1/3 h-8 border-2 border-gray-300 border-solid rounded float-end sm:text-lg"
        />
        </div>
        <div className="mt-10">
      <Space className="space-x-1 sm:space-x-5" direction="horizontal" size={12}>
        <FilterOutlined /> Filter:
      <RangePicker size="small" className="m-4"/>
      </Space>
        </div>
        <div>
        <Row gutter={[15, 15]} className='xl:px-1 ' >
            {courses.map((course) => (
              <Col key={course.id} xs={24} sm={12} md={12} lg={8} xl={8} >
                <Card
                  hoverable
                  cover={<img alt={course.title} src={course.image} />}
                >
                  <Card.Meta title={course.title}  />
                  <div className="flex items-center justify-between mt-4 ">
                  <h1 className='text-sm'>Finish Date: {course.finishDate}</h1>
                    <Button className='float-left text-white bg-red-500 p-3 mr-2'><HeartOutlined /></Button>
                  </div>
                </Card>
                
              </Col>
            ))}
          </Row>
        </div>
     </div>

   </Layout>
  )
}

export default Certificate