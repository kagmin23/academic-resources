import { FilterOutlined, HistoryOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Layout, Select, Space, Table, Typography, message } from "antd";
import { Purchase } from "models/types";
import { useEffect, useState } from "react";
import { searchPurchase } from "services/AdminsApi/purchaseApiService";

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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Purchase No",
      dataIndex: "purchase_no",
      key: "purchase_no",
    },
    {
      title: "Cart No",
      dataIndex: "cart_no",
      key: "cart_no",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Is Deleted",
      dataIndex: "is_deleted",
      key: "is_deleted",
    },
  ];

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await searchPurchase();
        console.log("response", response)
        setPurchase(response.data.pageData);
        setData(response.data.pageData);
        console.log("data", fetchPurchase)

      } catch (error) {
        message.error("Error fetching purchases")
        console.error('Error fetching purchases:', error);
      }
    };
    
    fetchPurchase();
  }, []);

  
  const refreshData = () => {
    setFilterText('');
    setFilterStatus(initialStatus);
    setFilterDate(null);
    setData(originalData);
  };

  const handleFilter = () => {
    let filteredData = originalData;

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
    const filteredData = originalData.filter((item) =>
      item.course_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setData(filteredData);
  }, [searchTerm]);

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
            className="w-1/3 h-8 border-2 border-gray-300 border-solid rounded float-end sm:text-sm"
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
                { value: 'Expired', label: 'Expired' },
                { value: 'Paid', label: 'Paid' },
              ]}
              onChange={(value) => setFilterStatus(value)}
            />
            <Button className="text-white bg-blue-600" onClick={handleFilter}>Apply</Button>
            <Button className="text-white bg-blue-600" onClick={refreshData}><RedoOutlined /></Button>
          </Space>

          <Table
            dataSource={data}
            columns={columns}
          />
        </div>
      </div>
    </Layout>
  );
}

export default PurchaseAdmin;
