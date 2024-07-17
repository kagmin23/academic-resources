import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Editor } from '@tinymce/tinymce-react';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Layout,
  Modal,
  Row,
  Select,
  Switch,
  Table,
  Typography,
  message,
} from "antd";
import { Category, Course } from "models/types";
import moment from "moment";
import { AlignType } from "rc-table/lib/interface";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getCategories } from "services/AdminsApi/categoryApiService";
import { changeCourseStatus } from "services/All/changerStatusApiService";
import { getCourses } from "services/All/getCoursesApiService";
import { createCourse, deleteCourse, updateCourse } from "services/Instructor/courseApiService";
import './stylesInstructor.css';


const { confirm } = Modal;
const { Header, Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

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
  // const [loading, setLoading] = useState<boolean>(true);
  // const [course, setCourse] = useState<Course | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [comment, setComment] = useState('');


  const navigate = useNavigate();

  const [logModalVisible, setLogModalVisible] = useState(false);

  const showLogModal = () => {
    setLogModalVisible(true);
  };

  const hideLogModal = () => {
    setLogModalVisible(false);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!course) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories("", 1, 10);
      setCategories(response.data.pageData);
    } catch (error) {
      console.error("Failed to fetch categories", error);
      setCategories([]);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getCourses('', 1, 10);
      console.log("courses", response);

      setDataSource(response.data.pageData);
      setFilteredDataSource(response.data.pageData);
    } catch (error) {
      console.error('Failed to fetch courses', error);
      setDataSource([]);
      setFilteredDataSource([]);
      message.error('Failed to fetch courses');
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
    deleteCourse(record._id)
      .then(() => {
        message.success('Course deleted successfully');
      })
      .catch((error) => {
        console.error("Failed to delete course", error);
        message.error('Failed to delete course');
      });
  };

  const handleSave = () => {
    form.validateFields()
      .then((values) => {
        if (typeof values.price === 'string') {
          values.price = parseFloat(values.price);
        }
        if (typeof values.discount === 'string') {
          values.discount = parseFloat(values.discount);
        }
        form.resetFields();
        if (isEditMode && currentRecord) {
          updateCourse(currentRecord._id, values)
            .then(() => {
              console.log("Values", values);
              const newDataSource = dataSource.map((item) =>
                item._id === currentRecord._id ? { ...item, ...values } : item
              );
              setDataSource(newDataSource);
              setFilteredDataSource(newDataSource);
              message.success('Course updated successfully');
            })
            .catch((error) => {
              console.error("Failed to update course", error);
              message.error('Failed to update course');
            });
        } else {
          createCourse(values)
            .then((response) => {
              const newRecord = {
                ...response.data,
                key: response.data._id,
                created_at: new Date().toISOString().split("T")[0],
              };
              setDataSource([newRecord, ...dataSource]);
              setFilteredDataSource([newRecord, ...dataSource]);
              message.success('Course created successfully');
            })
            .catch((error) => {
              console.error("Failed to create course", error);
              message.error('Failed to create course');
            });
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error('Validation failed');
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
      title: "Do you want to delete this course?",
      icon: <ExclamationCircleFilled />,
      content: "This action cannot be undone.",
      onOk() {
        handleDelete(record);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleViewSession = (courseId: string) => {
    navigate(`/instructor/profile-instructor/view-session/${courseId}`);
  };

  const onChangeStatus = async (courseId: string, newStatus: string, comment: string) => {
    try {
      console.log("courseId", courseId)
      console.log(`Changed Status of ${courseId} to Status ${newStatus}`);
      const response = await changeCourseStatus(courseId, newStatus, comment);
      console.log("response", response)
      // console.log("Response Data", response.data);
    } catch (error) {
      message.error("Changer Status Failed");
    }
  };

  const onSearch = (value: string) => {
    console.log('Search:', value);
  };


  
  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      // align: "center" as AlignType
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
      align: "center" as AlignType
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      // align: "center" as AlignType
    },
    // {
    //   title: "Video",
    //   dataIndex: "video_url",
    //   key: "video_url",
    //   align: "center" as AlignType
    // },
    // {
    //   title: "Image",
    //   dataIndex: "image_url",
    //   key: "image_url",
    //   align: "center" as AlignType
    // },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
      align: "center" as AlignType
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      align: "center" as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
    },
    {
      title: "Update At",
      dataIndex: "updated_at",
      key: "updated_at",
      align: "center" as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
    },
    
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center" as AlignType,
      render: (status: string, record: Course) => (
        <div>
          <Select
            size="small"
            className="text-xs"
            showSearch
            optionFilterProp="label"
            defaultValue={"new"}
            value={status}
            onChange={(newStatus) => {
              Modal.confirm({
                title: "Change Status Confirmation",
                content: (
                  <>
                    <p>Are you sure you want to change the status to "{newStatus}"?</p>
                    <Input.TextArea
                      rows={4}
                      placeholder="Enter a comment (optional)"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </>
                ),
                onOk: async () => {
                  try {
                    await onChangeStatus(record._id, newStatus, comment);
                    const updatedDataSource = dataSource.map(item =>
                      item._id === record._id ? { ...item, approval_status: newStatus } : item
                    );
                    setDataSource(updatedDataSource);
                
                    message.success("Changed Status Successfully")
                  } catch (error) {
                    console.error("Error updating status:", error);
                    Modal.error({ content: "An error occurred. Please try again later." });
                  }
                },
                onCancel: () => {},
              });
            }}
            options={[
              { value: 'new', label: 'New' },
              { value: 'waiting_approve', label: 'Waiting Approve' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </div>
      ),
    },
    
    {
      title: "Actions",
      key: "actions",
      align: "center" as AlignType,
      render: (text: string, record: Course) => (
        <div className="flex flex-row justify-center gap-1">
          <Button
            size="small"
            icon={<EditOutlined />}
            className="text-blue-500"
            onClick={() => handleEdit(record)}
          ></Button>

          <Button
            size="small"
            icon={<DeleteOutlined />}
            className="text-red-400"
            onClick={() => showConfirm(record)}
          ></Button>
          
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewMore(record._id)}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="p-0 bg-white">
        <div className="flex flex-row items-center justify-between gap-4 p-4 bg-[#939fb1]">
        <div className="mx-4 my-auto text-lg font-bold text-white">
            Manager Course
          </div>
          <div className="h-6 border-r lg:mx-4"></div>

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
          pagination={{ pageSize: 10 }}
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

                  <Col span={22} className="mb-5">
                    <Typography.Title level={5}>
                      Content:
                    </Typography.Title>
                    <p>{record.content || "-"}</p>
                  </Col>

                  <Col span={22} className="mb-5">
                    <Typography.Title level={5}>
                      Video:
                    </Typography.Title>
                    <iframe src={record.video_url}></iframe>
                  </Col>

                  <Col span={22}>
                    <Typography.Title level={5}>
                      Image:
                    </Typography.Title>
                    <Image src={record.image_url}></Image>
                  </Col>

                </Row>

                <Modal
                    visible={logModalVisible}
                    onCancel={hideLogModal}
                    footer={null}
                    width={800}
                  >
                    <h1 className="mb-5">Log Status</h1>
                    <div className="flex mb-5 space-x-5">
                      <Button className="text-white bg-teal-600">All log</Button>
                      <Select className="w-40">
                      <Select.Option value="New">New</Select.Option>
                      <Select.Option value="Waiting_approve">Waiting approve</Select.Option>
                      <Select.Option value="Approve">Approve</Select.Option>
                      <Select.Option value="Reject">Reject</Select.Option>
                      <Select.Option value="Active">Active</Select.Option>
                      <Select.Option value="Inactive">Inactive</Select.Option>
                      
                      </Select>

                      <Select className="w-40">
                      <Select.Option value="New">New</Select.Option>
                      <Select.Option value="Waiting_approve">Waiting approve</Select.Option>
                      <Select.Option value="Approve">Approve</Select.Option>
                      <Select.Option value="Reject">Reject</Select.Option>
                      <Select.Option value="Active">Active</Select.Option>
                      <Select.Option value="Inactive">Inactive</Select.Option>
                      
                      </Select>
                    </div>

                    <h1>Course Name: ...</h1>
                    <h1>Old status: ...</h1>
                    <h1>New status: ... </h1>
                    <h1>Comment: ...</h1>
                  </Modal>

                <Form layout="vertical">

                  <div className="flex flex-row gap-4">
                    <Button size="small" className="text-xs text-blue-500" onClick={showLogModal}>Log Status</Button>
                    <Button
                        size="small"
                        className="text-xs text-blue-500"
                        onClick={() => handleViewSession(record._id)}
                      >View Session</Button>
                  </div>
                  
                </Form>
              </div>
            ),
            expandIcon: () => null,
          }}
          rowKey="_id"
        />
      </Content>


      <Modal
        width={"50%"}
        title={isEditMode ? "Edit Course" : "Add New Course"}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Course Name"
            rules={[
              { required: true, message: "Please input the course name!" },
            ]}
          >
            {/* <Editor
              apiKey="oppz09dr2j6na1m8aw9ihopacggkqdg19jphtdksvl25ol4k"
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
            /> */}
            <Input/>
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: false, message: "Please input the description!" },
            ]}
          >
            {/* <Editor
              apiKey="oppz09dr2j6na1m8aw9ihopacggkqdg19jphtdksvl25ol4k"
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
            /> */}
            <Input/>
          </Form.Item>

          <Form.Item
            name="video_url"
            label="Video URL"
            rules={[{ required: false, message: 'Please input the video URL!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="image_url"
            label="Image URL"
            rules={[{ required: false, message: 'Please input the image URL!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Content">
            <Editor
              apiKey="oppz09dr2j6na1m8aw9ihopacggkqdg19jphtdksvl25ol4k"
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

          <Form.Item label="How do you want to sell this course?">
            <Switch checked={isSellChecked} onChange={onChangesell} />
            <p className="mt-2 italic text-blue-500">(Otherwise, this course will be FREE)</p>
          </Form.Item>

          {isSellChecked && (
            <div>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please input the price!' }]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                name="discount"
                label="Discount"
                // rules={[{ required: true, message: 'Please input the discount!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </div>
          )}
        </Form>
      </Modal>
    </Layout>
  );
};

export default ManagerCourseInstructor;
