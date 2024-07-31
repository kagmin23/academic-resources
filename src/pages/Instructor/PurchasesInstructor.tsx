import { FilterOutlined, HistoryOutlined, PlusCircleOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Input, Layout, Select, Space, Spin, Table, Tag, Typography, message } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Purchase } from "models/types";
import moment from "moment";
import { AlignType } from 'rc-table/lib/interface';
import { useEffect, useState } from "react";
import { createPayout } from "services/All/payoutApiService";
import { getItemsbyInstructorPurchases } from "services/Instructor/getPurchasesApiService";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

function PurchasesInstructor() {
  const [data, setData] = useState<Purchase[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterDate, setFilterDate] = useState<[string, string] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const payouts = await getItemsbyInstructorPurchases(1, 10);
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

  const handleSearch = (value: string) => {
    const filteredData = data.filter((item) =>
      item.course_name.toLowerCase().includes(value.toLowerCase()) ||
      item.purchase_no.toLowerCase().includes(value.toLowerCase()) ||
      item.cart_no.toLowerCase().includes(value.toLowerCase()) ||
      item.instructor_name.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  const handleCreatePayout = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one payout to create!");
      return;
    }
    setLoading(true);
    try {
      const transactions = selectedRowKeys.map((id) => ({ purchase_id: id as string }));
      console.log("transactions", transactions)
      const response = await createPayout('',transactions);
      console.log('Payout response:', response);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to create payout");
      console.error('Failed to create payout:', error);
    }finally {
      setLoading(false);
    }
  };


  const columns = [
    {
      title: <Checkbox
        checked={selectAll}
        onChange={handleSelectAll}
      />,
      key: "select",
      width: 60,
      align: 'center' as AlignType,
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedRowKeys.includes(record._id)}
          onChange={(e: CheckboxChangeEvent) => handleCheckboxChange(e, record._id)}
        />
      ),
    },
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    //   key: "_id",
    //   width: 100,
    // },
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: 'center' as AlignType,
      render: (status: string) => {
        let color: string;
        switch (status) {
          case 'new':
            color = '#999999';
            break;
          case 'request_paid':
            color = 'blue';
            break;
          case 'completed':
            color = 'green';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
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
          <Button className="my-2 text-white bg-blue-600" onClick={handleCreatePayout}><PlusCircleOutlined /> Create Payout</Button>

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
              />)
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PurchasesInstructor;
