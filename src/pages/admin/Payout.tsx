import { FilterOutlined, HistoryOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Input, Layout, Modal, Select, Space, Spin, Table, Typography, message } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Payout } from "models/types";
import moment from "moment";
import { AlignType } from 'rc-table/lib/interface';
import { useEffect, useState } from "react";
import { getPayouts, updateStatusPayout } from "services/All/payoutApiService";
import './stylesAdmin.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

function PayoutsAdmin() {
  const [data, setData] = useState<Payout[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterDate, setFilterDate] = useState<[string, string] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [comment, setComment] = useState('');
  const [payout, setPayout] = useState<Payout[]>([]);

  const fetchPayouts = async () => {
    setLoading(true);
    try {
      const response = await getPayouts(1, 10);
      // setData(Array.isArray(response) ? response : []);
      setData(response);
    } catch (error) {
      console.error('Error fetching payouts:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
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

  const onUpdateStatusPayout = async (payoutId: string, newStatus: string, comment: string) => {
    try {
      console.log(`Changing status of payout with ID ${payoutId} to ${newStatus}`);
      const response = await updateStatusPayout(payoutId, newStatus, '');
      console.log("Response:", response);
  
      if (response) {
        message.success('Changed Status Successfully!');
        setData(prevData =>
          prevData.map(payout =>
            payout._id === payoutId ? { ...payout, status: newStatus } : payout
          )
        );
      }
    } catch (error) {
      message.error('Failed to update payout status!');
      console.error('Error:', error);
    }
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
    fetchPayouts();
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
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
      width: 150,
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      width: 150,
    },
    {
      title: "Balance Origin",
      dataIndex: "balance_origin",
      key: "balance_origin",
      align: 'end' as AlignType,
      width: 120,
    },
    {
      title: "Balance Instructor Paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      width: 200,
      align: 'end' as AlignType,
    },
    {
      title: "Balance Instructor Received",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      width: 200,
      align: 'end' as AlignType,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      align: "center" as AlignType,
      render: (status: string, record: Payout) => (
        <div>
          <Select
            size="small"
            className="items-start w-32 text-xs"
            showSearch
            optionFilterProp="label"
            defaultValue={status}
            value={status}
            onChange={(newStatus) => {
              Modal.confirm({
                title: "Change Status Confirmation!",
                content: (
                  <>
                    <p className="mb-3">Are you sure you want to change the status to "{newStatus}"?</p>
                    <Input.TextArea
                      name="comment"
                      // value="comment"
                      rows={4}
                      placeholder="Enter a comment (optional)"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </>
                ),
                onOk: () => onUpdateStatusPayout(record._id, newStatus, comment),
                onCancel: () => {},
              });
            }}
            options={[
              { value: 'new', label: 'New' },
              { value: 'request_payout', label: 'Request Payout' },
              { value: 'completed', label: 'Completed' },
              { value: 'rejected', label: 'Rejected' },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      align: 'center' as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 150,
      align: 'center' as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
    },
  ];

  return (
    <Layout>
      <div className="p-5">
        <div className="py-5">
          <h1 className="text-lg font-bold float-start sm:text-2xl">
            <HistoryOutlined className="mr-2" /> Payout History
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
            ( <div className="flex items-center justify-center h-64">
              <Spin size="large"></Spin>
              </div>) : (
          <Table
            columns={columns}
            dataSource={Array.isArray(data) ? data : []}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{x: 'max-content'}}
          />
        )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PayoutsAdmin;
