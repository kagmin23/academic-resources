import { FilterOutlined, HistoryOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Layout, Select, Space, Spin, Table, Tag, Typography, notification } from "antd";
import { Purchase } from "models/types";
import moment from "moment";
import { AlignType } from 'rc-table/lib/interface';
import { useEffect, useState } from "react";
import { getPurchasesAll } from "services/AdminsApi/getPurchasesApiService";
import './stylesAdmin.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

function PurchasesAdmin() {
  const [data, setData] = useState<Purchase[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterDate, setFilterDate] = useState<[string, string] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const payouts = await getPurchasesAll(1, 10);
      setData(payouts);
    } catch (error: any) {
      notification.error({
        message: "Failed to get Purchases!",
        description:
          error.message || "Failed to get Purchases. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

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
  
  const handleSearch = (value: string) => {
    const filteredData = data.filter((item) =>
      item.course_name.toLowerCase().includes(value.toLowerCase()) ||
      item.purchase_no.toLowerCase().includes(value.toLowerCase()) ||
      item.cart_no.toLowerCase().includes(value.toLowerCase()) ||
      item.instructor_name.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  const statusColors: { [key: string]: string } = {
    new: '#999999',
    request_paid: 'blue',
    completed: 'green',
  };

  const columns = [
    {
      title: "Purchase No",
      dataIndex: "purchase_no",
      key: "purchase_no",
      width: 150,
    },
    {
      title: "Cart No",
      dataIndex: "cart_no",
      key: "cart_no",
      width: 150,
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      width: 200,
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
      align: 'end' as AlignType,
      width: 120,
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
      width: 150,
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: 'center' as AlignType,
      render: (status: string) => (
        <Tag color={statusColors[status] || 'default'}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      align: 'center' as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 200,
      align: 'center' as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
    },
  ];

  return (
    <Layout>
      <div className="p-5">
        <div className="py-5">
          <h1 className="text-lg font-bold float-start sm:text-2xl">
            <HistoryOutlined className="mr-2" /> Purchases History
          </h1>
        </div>

        <div className="my-5">
          <div className="flex flex-row items-center justify-between">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
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
                    { value: 'new', label: 'New' },
                    { value: 'request_paid', label: 'Request Paid' },
                    { value: 'completed', label: 'Completed' },
                  ]}
                  onChange={(value) => setFilterStatus(value)}
                />
                <Button className="text-xs text-white bg-blue-600" onClick={handleFilter}>Apply</Button>
                <Button className="text-white bg-blue-600" onClick={refreshData}><RedoOutlined /></Button>
              </div>
            </Space>
          </div>
          <div className="overflow-x-auto">
            {loading ?
              (<div className="flex items-center justify-center h-64">
                <Spin size="large" />
              </div>) :
              (<Table
                rowKey="_id"
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
              />)
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PurchasesAdmin;
