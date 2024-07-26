import { FilterOutlined, HistoryOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Layout, Select, Space, Spin, Table, Typography } from "antd";
import { Purchase } from "models/types";
import moment from "moment";
import { AlignType } from 'rc-table/lib/interface';
import { useEffect, useState } from "react";
import { getPurchases } from "services/AdminsApi/purchaseApiService";
import './stylesAdmin.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

function PurchaseAdmin() {
  const [filterText, setFilterText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterDate, setFilterDate] = useState<[string, string] | null>(null);
  const [originalData, setPurchase] = useState<Purchase[]>([]);
  const [initialStatus, setInitialStatus] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [data, setData] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 100,
    },
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: 'end' as AlignType,
      width: 120,
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
      align: 'end' as AlignType,
      width: 120,
    },
    {
      title: "Discount(%)",
      dataIndex: "discount",
      key: "discount",
      align: 'center' as AlignType,
      width: 100,
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
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 120,
      align: 'center' as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 120,
      align: 'center' as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
    },
  ];

  useEffect(() => {
    const fetchPurchase = async () => {
      setLoading(true);
      try {
        const purchases = await getPurchases(1, 10);
        setPurchase(purchases);
        setData(purchases);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }finally{
      setLoading(false);
      }
    };

    fetchPurchase();
  }, []);

  const refreshData = () => {
    setFilterText('');
    setFilterStatus(initialStatus);
    setFilterDate(null);
    setData(originalData || []);
  };

  const handleFilter = () => {
    let filteredData = originalData || [];

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

  useEffect(() => {
    let filteredData = originalData || [];

    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        item.course_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setData(filteredData);
  }, [searchTerm, originalData]);

  return (
    <Layout>
      <div className="p-5">
        <div className="py-5">
          <h1 className="text-lg font-bold float-start sm:text-2xl">
            <HistoryOutlined className="mr-2" /> Purchase History
          </h1>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/4 h-8 border-2 border-gray-300 border-solid rounded float-end sm:text-sm"
          />
        </div>

        <div className="mt-10">
          <Space className="space-x-1 sm:space-x-5" direction="horizontal" size={12}>
            <FilterOutlined /> Filter:
            <RangePicker
              size="small"
              className="m-4"
              onChange={(dates, dateStrings) => setFilterDate(dateStrings as [string, string])}
            />
            <Select
              size="small"
              placeholder="Status"
              options={[
                { value: 'new', label: 'New' },
                { value: 'waiting_paid', label: 'Waiting Paid' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancel', label: 'Cancel' },
              ]}
              onChange={(value) => setFilterStatus(value)}
            />
            <Button className="text-white bg-blue-600" onClick={handleFilter}>Apply</Button>
            <Button className="text-white bg-blue-600" onClick={refreshData}><RedoOutlined /></Button>
          </Space>

          <div className="overflow-x-auto">
            {loading ?
              (<div className="flex items-center justify-center h-64">
                  <Spin size="large" />
                </div>
                ) : (
                  <Table
                    dataSource={data}
                    columns={columns}
                    scroll={{ x: 'max-content' }}
                  />
                )}
              </div>
          </div>
      </div>
    </Layout>
  );
}

export default PurchaseAdmin;
