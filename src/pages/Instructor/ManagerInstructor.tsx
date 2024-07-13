import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Editor } from '@tinymce/tinymce-react';
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Select,
  Switch,
  Table,
  Typography
} from "antd";
import Title from "antd/lib/typography/Title";
import { AlignType } from "rc-table/lib/interface";
import React, { useEffect, useState } from "react";
import { getCategories } from "services/AdminsApi/categoryApiService";

const { confirm } = Modal;
const { Header, Content, Footer } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

interface Course {
  _id: string;
  name: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  status: string;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

interface Category {
  id: string;
  name: string;
}

const ManagerCourseInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<Course[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Course | null>(null);
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [isSellChecked, setIsSellChecked] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories("", 1, 10);  // Adjust the parameters as necessary
      console.log('Categories Response:', response);
      if (Array.isArray(response.data)) {
        setCategories(response.data);
        console.log('Categories Set:', response.data);
      } else {
        console.error('Response data is not an array', response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
      setCategories([]);
    }
  };

  const onChangesell = (checked: boolean) => {
    setIsSellChecked(checked);
    if (!checked) {
      form.setFieldsValue({ price: undefined });
    }
  };

  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);
  };

  const handleAddNewCourse = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record: Course) => {
    setIsEditMode(true);
    setCurrentRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleViewMore = (key: string) => {
    setExpandedKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key]
    );
  };

  const handleDelete = (record: Course) => {
    const newDataSource = dataSource.filter((item) => item._id !== record._id);
    setDataSource(newDataSource);
    setFilteredDataSource(newDataSource);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        if (isEditMode && currentRecord) {
          const newDataSource = dataSource.map((item) =>
            item._id === currentRecord._id ? { ...item, ...values } : item
          );
          setDataSource(newDataSource);
          setFilteredDataSource(newDataSource);
        } else {
          const newRecord = {
            ...values,
            key: (dataSource.length + 1).toString(),
            created_at: new Date().toISOString().split("T")[0],
          };
          setDataSource([...dataSource, newRecord]);
          setFilteredDataSource([...dataSource, newRecord]);
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const showConfirm = (record: Course) => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        console.log("OK");
        handleDelete(record);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "Course",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <div className="w-24 h-12">
          <img
            src={text}
            alt="item"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ),
    },
    {
      title: "Course Name",
      dataIndex: "name_course",
      key: "name_course",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center" as AlignType,
      render: (text: string, record: Course) => (
        <div style={{ textAlign: "center" }}>
          <Button
            icon={<EditOutlined />}
            className="mr-2 text-white bg-blue-500"
            onClick={() => handleEdit(record)}
          ></Button>

          <Button
            icon={<DeleteOutlined />}
            className="mr-2 text-white bg-red-600"
            onClick={() => showConfirm(record)}
          ></Button>
          
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewMore(record._id)}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-wrap items-center justify-end gap-4 p-4 bg-[#939fb1]">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
            <div className="h-6 border-r lg:mx-4"></div>
            <Button
              className="font-bold text-white bg-red-500"
              onClick={handleAddNewCourse}
            >
              <PlusCircleOutlined />
              Add New Course
            </Button>
          </div>
        </Header>
        <Content className="mx-4 my-4 overflow-y-auto xl:mx-6">
          <Table
            pagination={{ pageSize: 6 }}
            dataSource={filteredDataSource}
            columns={columns}
            expandable={{
              expandedRowKeys: expandedKeys,
              onExpand: (expanded, record) => handleViewMore(record._id),
              expandedRowRender: (record: Course) => (
                <div
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "4px",
                    marginLeft: "25px",
                  }}
                >
                  <Row gutter={16} className="mb-5">
                    <Col span={22}>
                      <Title level={5} className="">
                        Description:
                      </Title>

                      <p>{record.description || "-"}</p>
                    </Col>
                  </Row>

                  <Row                    gutter={16}
                    align="middle"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Col span={8}>
                      <Text strong className="mr-2">
                        Price:
                      </Text>
                    </Col>
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
        width={"50%"}
        title={isEditMode ? "Edit Course" : "Add New Course"}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name_course"
            label="Name Course"
            rules={[
              { required: true, message: "Please input the name course!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item name="video_url" label="Video URL">
            <Input />
          </Form.Item>

          <Form.Item name="image_url" label="Image URL">
            <Input />
          </Form.Item>

          <Form.Item label="Content">
            <Editor
              apiKey="your-api-key"
              initialValue="<p>This is the initial content of the editor</p>"
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
          </Form.Item>

          <Form.Item label="Sell Course">
            <Switch checked={isSellChecked} onChange={onChangesell} />
          </Form.Item>

          {isSellChecked && (
            <Form.Item name="price" label="Price">
              <Input type="number" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Layout>
  );
};

export default ManagerCourseInstructor;

