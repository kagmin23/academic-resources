import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  StarFilled 
} from '@ant-design/icons';

import { Button, Col, Form, Input, Layout, Modal, Row, Table, Typography ,Tag} from 'antd';
import Title from 'antd/lib/typography/Title';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useRef, useState } from 'react';
import { Switch } from 'antd';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { getCourses, updateCourse, deleteCourse, createCourse } from 'services/Instructor/CourseService';


const { confirm } = Modal;
const { Header, Content, Footer } = Layout;
const { Text } = Typography;
const { TextArea } = Input;
interface DataType {
  key: string;
  image: string;
  name_course: string;
  created_at: string;
  description: string;
  rate?: string;
  price?: number;
  sell:boolean;
  number_sessions:number;
  list_category: list_category[];

}
interface list_category {
  id: number;
  category:string;
  
}

const initialDataSource: DataType[] = [
    {
      key: '1',
      image: 'https://via.placeholder.com/50',
      name_course: 'Cách học tập tốt',
      created_at: '2024-01-01',
      sell: true,
      list_category: [
        { id: 1, category: 'Programming' },
        { id: 2, category: 'Web Design' },
        { id: 3, category: 'Typescript' }
      ],
      
      price: 350.000,
      number_sessions:10,
      rate: '4.5',
      description: 'To have an overview of the IT industry - Web programming, you should watch the videos in this course first. What will you learn? -Basic knowledge, foundations of the IT industry Basic models and architecture when deploying applications. Core concepts and terms when deploying applications. Understand more about how the internet and computers work'
    },
  
  
  {
    key: '2',
    image: 'https://via.placeholder.com/50',
    name_course: 'Item 2',
    created_at: '2024-01-02',
    sell:false,
    number_sessions:10,
    list_category: [
      { id: 4, category: 'HTML' },
      { id: 5, category: 'Javascrip' },
      
    ],
    description:'This course focuses on HTML, JavaScript, and web design techniques to develop beautiful and professional websites.'
  },
  {
    key: '3',
    image: 'https://via.placeholder.com/50',
    name_course: 'Item 3',
    created_at: '2024-01-03',
    sell:true,
    list_category: [
      { id: 6, category: 'Electrical Engineering' },
      { id: 7, category: 'Mechanical' },
      { id: 8, category: 'Construction Engineering' }
    ],
    description:'Students will learn electrical and mechanical engineering, an important foundation for technical careers.',
    price:350.000,
    number_sessions:10,
  },
  {
    key: '4',
    image: 'https://via.placeholder.com/50',
    name_course: 'Item 4',
    created_at: '2024-01-04',
    sell:true,
    list_category: [
      { id: 9, category: 'Communication skills' },
      { id: 10, category: 'Problem solving skills'},
      { id: 11, category: 'Presentation skills'}
    ],
    price:350.000,
    number_sessions:10,
    description:'This course focuses on how to solve problems in daily work, helping you become an effective employee and solve challenges well.'
  },
  {
    key: '5',
    image: 'https://via.placeholder.com/50',
    name_course: 'Item 5',
    created_at: '2024-01-05',
    sell:false,
    list_category: [
      { id: 9, category: 'Communication skills' },
      { id: 10, category: 'Problem solving skills'},
      { id: 11, category: 'Presentation skills'}
    ],
    description:'Learners will practice communication, problem solving and presentation skills, important skills in the modern work environment.',
    
    number_sessions:10,
  },
  {
    key: '6',
    image: 'https://via.placeholder.com/50',
    name_course: 'Item 6',
    created_at: '2024-01-06',
    sell:true,
    list_category: [
      { id: 9, category: 'Communication skills' },
      { id: 10, category: 'Problem solving skills'},
      { id: 11, category: 'Presentation skills'}
    ],
    price:250.000,
    number_sessions:10,
    description:'This course provides basic knowledge of web programming and application architecture, helping you gain a deeper understanding of how the internet and computers work.'
  },
];

const ManagerCourseInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(initialDataSource);
  const [filteredDataSource, setFilteredDataSource] = useState<DataType[]>(initialDataSource);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [isSellChecked, setIsSellChecked] = useState(false);


  // Xử lý sự kiện khi thay đổi trạng thái 'sell'
  const onChangesell = (checked: boolean) => {
    setIsSellChecked(checked);
    if (!checked) {
      form.setFieldsValue({ price: undefined }); // Reset giá khi không bán
    }
  };


  // category:
  const categoryOptions = [
    { id: 1, category: 'Programming' },
    { id: 2, category: 'Web Design' },
    { id: 3, category: 'Typescript' },
    { id: 4, category: 'HTML' },
    { id: 5, category: 'JavaScript' },
    { id: 6, category: 'Electrical Engineering' },
    { id: 7, category: 'Mechanical' },
    { id: 8, category: 'Construction Engineering' },
    { id: 9, category: 'Communication skills' },
    { id: 10, category: 'Problem solving skills' },
    { id: 11, category: 'Presentation skills' },
  ];
  
  const options: SelectProps['options'] = categoryOptions.map(category => ({
    value: category.id.toString(),
    label: category.category,
  }));

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};


  const handleAddNewCourse = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record: DataType) => {
    setIsEditMode(true);
    setCurrentRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleViewMore = (key: string) => {
    setExpandedKeys(prevKeys =>
      prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
    );
  };

  const handleDelete = (record: DataType) => {
    const newDataSource = dataSource.filter(item => item.key !== record.key);
    setDataSource(newDataSource);
    setFilteredDataSource(newDataSource);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        if (isEditMode && currentRecord) {
          const newDataSource = dataSource.map(item =>
            item.key === currentRecord.key ? { ...item, ...values } : item
          );
          setDataSource(newDataSource);
          setFilteredDataSource(newDataSource);
        } else {
          const newRecord = {
            ...values,
            key: (dataSource.length + 1).toString(),
            created_at: new Date().toISOString().split('T')[0],
          };
          setDataSource([...dataSource, newRecord]);
          setFilteredDataSource([...dataSource, newRecord]);
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter(item =>
      item.name_course.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  //confirm
  const showConfirm = (record: DataType) => {
    confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
        handleDelete(record);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  // const handleConfirmDelete = (record: DataType) => {
  //   confirm({
  //     title: 'Do you want to delete these?',
  //     icon: <ExclamationCircleFilled />,
  //     content: 'Hành động này không thể hoàn tác',
  //     okText: 'Xóa',
  //     okType: 'danger',
  //     cancelText: 'Hủy',
  //     onOk() {
  //       handleDelete(record);
  //     },
  //   });
  // };


  const columns = [
    {
      title: 'Course',
      dataIndex: 'image',
      key: 'image',
      // render: (text: string) => <img src={text} alt="item" className="w-20 h-15" />,
      render: (text: string) => (
        <div className="w-24 h-12">
          <img src={text} alt="item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>),
    },
    {
      title: 'Course Name',
      dataIndex: 'name_course',
      key: ' name_course',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as AlignType,
      render: (text: string, record: DataType) => (
        <div style={{ textAlign: 'center' }}>
          <Button icon={<EditOutlined />} className="mr-2 text-white bg-blue-500" onClick={() => handleEdit(record)}></Button>
          <Button icon={<DeleteOutlined />} className="mr-2 text-white bg-red-600"  onClick={() => showConfirm(record)}></Button>
          <Button icon={<EyeOutlined />} onClick={() => handleViewMore(record.key)}></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ height: '100vh'}}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-wrap items-center justify-end gap-4 p-4 bg-[#939fb1]">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={e => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
            <div className="h-6 lg:mx-4 border-r"></div>
            <Button className="font-bold text-white bg-red-500" onClick={handleAddNewCourse}>
              <PlusCircleOutlined />
              Add New Course
            </Button>
          </div>
        </Header>
        <Content className="my-4 mx-4 xl:mx-6 overflow-y-auto">
          <Table
          pagination={{ pageSize: 6 }}
            dataSource={filteredDataSource}
            columns={columns}
            expandable={{
              expandedRowKeys: expandedKeys,
              onExpand: (expanded, record) => handleViewMore(record.key),
              expandedRowRender: (record: DataType) => (
                <div style={{ padding: '10px 20px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginLeft: '25px' }}>
                  <Row gutter={16} className='mb-5'>
                    
                    <Col span={22}>
                      <Title level={5} className=''>Description:</Title>
                      
                      <p>{record.description || '-'}</p>
                    </Col>
                  </Row>
                  <Row gutter={16} className='mb-5'>
                    
                  <Col span={22}>
                  <Title level={5} className=''>Category:</Title>
                      {/* <p>{record.list_category?.map(category => category.category).join(', ') || '-'}</p> */}
                       <p>
                      {record.list_category?.map(category => <Tag color="geekblue">{category.category}</Tag>) || '-'}</p>

                  </Col>

                  </Row>

                  <Row gutter={16} align="middle" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col span={8}>
                      <Text strong className='mr-2'>Number of sessions:</Text>
                      {record.number_sessions || '-'}
                    </Col>
                    <Col span={8} >
                      <Text strong className='mr-2'>Rate:</Text>
                      {record.rate || '-'} <StarFilled style={{ color: '#FFE200' }} />

                    </Col>
                    <Col span={8}>
                      <Text strong className='mr-2'>Price:</Text>
                      {record.sell ? (record.price ? `${record.price.toLocaleString('vi-VN')}.000 VND` : '-') : <Text strong style={{ color: '#1890ff' }}>Free Course</Text>}
                    </Col>

                    {/* <Col span={8}>
                      <Text strong className='mr-2'>Price:</Text>
                      <p>${record.price || '-'}</p>
                      {record.price ? `${record.price.toLocaleString('vi-VN')}.000 VND` : '-'}

                    </Col> */}
                  </Row>
                </div>
              ),
              expandIcon: () => null,
            }}
            rowKey="key"
          />
        </Content>
        
      </Layout>

      <Modal
        width={'50%'}
        title={isEditMode ? "Edit Course" : "Add New Course"}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: 'Please input the image URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name_course"
            label="Name Course"
            rules={[{ required: true, message: 'Please input the name course!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description Course:"
            rules={[{ required: true, message: 'Please input the description course!' }]}
          >
           <TextArea
      
      placeholder="Description"
      style={{ height: 120, resize: 'none' }}
           />
          </Form.Item>

          
          <Form.Item
      name="sell"
      label="Do you want sell this course?"
      valuePropName="checked"
    >
      <Switch onChange={onChangesell} />
    </Form.Item>
    {isSellChecked && (
      <Form.Item
        name="price"
        label="Price:"
        rules={[{ required: true, message: 'Please input price course!' }]}
      >
        <Input type="number" />
      </Form.Item>
    )}
    <Form.Item>
      {!isSellChecked && (
        <Text strong style={{ color: '#1890ff' }}>Free course</Text>
      )}
    </Form.Item>
    {/* Category */}
    {/* <Form.Item
            name="list_category"
            label="Category:"
            rules={[{ required: true, message: 'Please input the name course!' }]}
          >
            <Select
    mode="tags"
    style={{ width: '100%' }}
    placeholder="Tags Mode"
    onChange={handleChange}
    options={options}
  />
          </Form.Item> */}
        </Form>
      </Modal>
    </Layout>
  );
};

export default ManagerCourseInstructor;



