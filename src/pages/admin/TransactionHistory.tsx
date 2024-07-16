import {
  FilterOutlined,
  HistoryOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Layout,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { Input } from "antd/lib";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;
interface DataType {
  key: string;
  id: string;
  status: string;
  amount: string;
  created_at: string;
  instructor: string;
  account: string;
  course: string;
}

function TransactionHistory() {
  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState<[string, string] | null>(null);
  const { RangePicker } = DatePicker;
  const [originalData, setOriginalData] = useState<DataType[]>([
    {
      key: "1",
      created_at: "2024-02-10",
      id: "00001",
      course: "Reacjs",
      instructor: "john doe",
      account: "webooslayer420",
      status: "Paid",
      amount: "100.000 VND",
    },
    {
      key: "2",
      created_at: "2024-03-15",
      id: "00002",
      course: "Full-Stack Developer",
      instructor: "john doe",
      account: "chinanumber1",
      status: "Paid",
      amount: "200.000 VND",
    },
    {
      key: "3",
      created_at: "2024-04-12",
      id: "00003",
      course: "Reacjs",
      instructor: "john doe",
      account: "deez",
      status: "Paid",
      amount: "149.999 VND",
    },
    {
      key: "4",
      created_at: "2024-05-01",
      id: "00004",
      course: "Reacjs",
      instructor: "john doe",
      account: "butternuts",
      status: "Expired",
      amount: "149.999 VND",
    },
  ]);
  const [initialStatus, setInitialStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      created_at: "2024-02-10",
      id: "00001",
      course: "Reacjs",
      instructor: "john doe",
      account: "webooslayer420",
      status: "Paid",
      amount: "100.000 VND",
    },
    {
      key: "2",
      created_at: "2024-03-15",
      id: "00002",
      course: "Full-Stack Developer",
      instructor: "john doe",
      account: "chinanumber1",
      status: "Paid",
      amount: "200.000 VND",
    },
    {
      key: "3",
      created_at: "2024-04-12",
      id: "00003",
      course: "Reacjs",
      instructor: "john doe",
      account: "deez",
      status: "Paid",
      amount: "149.999 VND",
    },
    {
      key: "4",
      created_at: "2024-05-01",
      id: "00004",
      course: "Reacjs",
      instructor: "john doe",
      account: "butternuts",
      status: "Expired",
      amount: "149.999 VND",
    },
  ]);

  const columns = [
    {
      title: "Transaction time",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const refreshData = () => {
    console.log("Refresh button clicked");
    setFilterText("");
    setFilterStatus(initialStatus);
    setFilterDate(null);
    setData(originalData);
  };

  const handleFilter = () => {
    let filteredData = originalData;

    if (filterStatus) {
      filteredData = filteredData.filter(
        (item) => item.status === filterStatus
      );
    }

    if (filterDate) {
      filteredData = filteredData.filter((item) => {
        const [startDate, endDate] = filterDate;
        const itemDate = new Date(item.created_at);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return itemDate >= startDateObj && itemDate <= endDateObj;
      });
    }

    setData(filteredData);
  };

  useEffect(() => {
    setOriginalData(data);
    setInitialStatus("");
  }, []);

  useEffect(() => {
    // Store the original unfiltered data when the component mounts
    const filteredData = originalData.filter((item) =>
      item.account.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setData(filteredData);
  }, [searchTerm]);

  return (
      <div className="p-5 ">
        <div className="py-5">
          <h1 className="text-lg font-bold float-start sm:text-2xl ">
            <HistoryOutlined className="mr-2"></HistoryOutlined> Transaction
            History
          </h1>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3 h-8 border-2 border-gray-300 border-solid rounded float-end sm:text-lg"
          />
        </div>
        <div className="mt-10">
          <Space
            className="space-x-1 sm:space-x-5"
            direction="horizontal"
            size={12}
          >
            <FilterOutlined /> Filter:
            <RangePicker size="small" className="m-4" />
            <Select
              size="small"
              placeholder="Status"
              options={[
                {
                  value: "Expired",
                  label: "Expired",
                },
                {
                  value: "Paid",
                  label: "Paid",
                },
              ]}
              onChange={(value) => setFilterStatus(value)}
            ></Select>
            <Button className="text-white bg-blue-600" onClick={handleFilter}>
              {" "}
              Apply
            </Button>
            <Button className="text-white bg-blue-600" onClick={refreshData}>
              <RedoOutlined />
            </Button>
          </Space>

          <Table dataSource={data} columns={columns} />
        </div>
      </div>
  );
}

export default TransactionHistory;
