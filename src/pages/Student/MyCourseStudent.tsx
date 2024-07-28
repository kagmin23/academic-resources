import { DoubleRightOutlined, FilterOutlined, ReadOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Layout, Select, Space, Spin, Table, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Purchase } from "models/types";
import { AlignType } from 'rc-table/lib/interface';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItemsbyStudentPurchases } from "services/Student/getpurchaseApiService";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export interface Subcription {
  _id:	string,
  subscriber_id:	string,
  subscriber_name:	string,
  instructor_id:	string,
  instructor_name:	string,
  is_subscribed:	boolean,
  created_at:	Date,
  updated_at:	Date,
  is_deleted:	boolean,
}

function ListCoursesStudent() {
  const [data, setData] = useState<Purchase[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterDate, setFilterDate] = useState<[string, string] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const payouts = await getItemsbyStudentPurchases(1, 10);
      setData(payouts);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedRowKeys(data.map(item => item._id));
    } else {
      setSelectedRowKeys([]);
    }
    setSelectAll(checked);
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent, id: React.Key) => {
    const { checked } = e.target;
    setSelectedRowKeys(prev => checked
      ? [...prev, id]
      : prev.filter(key => key !== id));
  };

  const refreshData = () => {
    setFilterText('');
    setFilterStatus('');
    setFilterDate(null);
    fetchPurchases();
  };

  const handleFilter = () => {
    let filteredData = data;

    if (filterStatus) {
      filteredData = filteredData.filter((item) => item.status === filterStatus);
    }

    if (filterDate) {
      filteredData = filteredData.filter((item) => {
        const [startDate, endDate] = filterDate;
        const itemDate = new Date(item.created_at);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }

    setData(filteredData);
  };
  
  const getTotalListCourseStudent = (): number => {
    return data.length;
  };

  // const onChangeStatus = (value: string) => {
  //   const savedStatuses = JSON.parse(localStorage.getItem('listCourseStatuses') || '{}');
  //   savedStatuses[value] = value;
  //   localStorage.setItem('purchaseStatuses', JSON.stringify(savedStatuses));
  //   setData(prevData => prevData.map(item =>
  //     item._id === value ? { ...item, status: value } : item
  //   ));
  //   console.log(`Updated status to ${value}`);
  // }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 50,
      key: 'stt',
      align: "center" as AlignType,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      width: 200,
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      width: 150,
    },
    // {
    //   title: "Status",
    //   dataIndex: "status_list",
    //   key: "status_list",
    //   width: 120,
    //   align: 'center' as AlignType,
    //   render: (status: string) => {
    //     return (
    //       <Select
    //         value={status || "Process"}
    //         onChange={(value) => onChangeStatus(value)}
    //       >
    //         <Option className="text-xs" value="Process">Process</Option>
    //         <Option className="text-xs" value="Success">Success</Option>
    //       </Select>
    //     )
    //   },
    // },
    {
      title: "Action",
      dataIndex: "course_id",
      key: "course_id",
      width: 100,
      align: 'center' as AlignType,
      render: (course_id: string) => (
        <div className="text-xs">
          <Button className="text-xs bg-slate-200"
              onClick={() => {navigate(`/student-learning/${course_id}`)}}
            >Learn Now<DoubleRightOutlined /></Button>
        </div>
      )
    },
  ];

  return (
    <Layout>
      <div className="p-5">
        <div className="py-5">
          <h1 className="text-lg font-bold float-start sm:text-2xl">
            <ReadOutlined className="mr-2" /> Wish List
          </h1>
        </div>
        <div className="my-5">
          <div className="flex flex-row items-center justify-between">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/4 h-8 border-2 border-gray-300 border-solid rounded float-end sm:text-sm"
            />
            <Space className="space-x-1 sm:space-x-5" direction="horizontal" size={12}>
              <FilterOutlined /> Filter:
              <RangePicker
                size="small"
                className="m-4"
                onChange={(dates, dateStrings) => setFilterDate(dateStrings as [string, string])}
              />
              <div className="flex items-center justify-center gap-2">
                <Select
                  className="w-36"
                  size="small"
                  placeholder="Status"
                  options={[
                    { value: 'process', label: 'Process' },
                    { value: 'success', label: 'Success' },
                  ]}
                  onChange={(value) => setFilterStatus(value)}
                />
                <Button className="text-xs text-white bg-blue-600" onClick={handleFilter}>Apply</Button>
                <Button className="text-white bg-blue-600" onClick={refreshData}><RedoOutlined /></Button>
              </div>
            </Space>
          </div>
          <div>
            <span className='px-3 text-xs font-semibold'>Total Courses: {getTotalListCourseStudent()}</span>
          </div>
          <div className="py-2 overflow-x-auto">
            {loading ?
              (<div className="flex items-center justify-center h-64">
                <Spin size="large" />
              </div>) :
              (<Table
                rowKey="_id"
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
                // scroll={{x: 'max-content'}}
              />)
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ListCoursesStudent;
