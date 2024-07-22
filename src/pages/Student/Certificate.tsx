import { DownloadOutlined, FilterOutlined, ReadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Input, Pagination, Row, Space } from 'antd';
import { useState } from 'react';

interface Certificate {
  id: number;
  image: string;
  title: string;
  finishDate: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    image: 'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
    title: 'Course 1',
    finishDate: '2022-10-03',
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
      title:'Lmao',
      finishDate: '2022-10-3'
    },
    {
      id: 13,
      image:'https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg',
      title:'cdjo',
      finishDate: '2022-10-3'
    },]

   
const Certificate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [searchTerm, setSearchTerm] = useState('');

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredCertificates = certificates.filter((cert) =>
    cert.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { RangePicker } = DatePicker;

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col bg-white p-4">
        <div className="bg-white p-4 rounded-md shadow-md flex-1 overflow-y-auto">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-lg font-bold sm:text-2xl">
              <ReadOutlined className="mr-2" /> Your Certificates
            </h1>
            <Input
              placeholder="Search Certificate"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 h-8 border-2 border-gray-300 rounded sm:text-lg"
            />
          </div>
          <div className="flex items-center justify-between my-4">
            <Space size={12}>
              <FilterOutlined /> Filter:
              <RangePicker size="small" className="m-4" />
            </Space>
          </div>
          <div className="flex-1 mx-auto" style={{ maxWidth: 1050 }}>
            <Row gutter={[15, 15]}>
              {filteredCertificates.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((certificate) => (
                <Col key={certificate.id} xs={24} sm={12} md={12} lg={8} xl={8}>
                  <Card
                    hoverable
                    cover={<img alt={certificate.title} src={certificate.image} />}
                    style={{ maxWidth: 350 }}
                  >
                    <Card.Meta title={certificate.title} className="text-ellipsis" />
                    <div className="flex justify-between mt-4 items-center">
                      <h1 className="text-sm">Finish Date: {certificate.finishDate}</h1>
                      <Button size="small" className="text-white bg-blue-500">
                        <DownloadOutlined />
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredCertificates.length}
              onChange={handlePageChange}
              className="flex justify-center mt-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;