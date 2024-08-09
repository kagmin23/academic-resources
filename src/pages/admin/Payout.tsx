import { CheckOutlined, CloseOutlined, FilterOutlined, HistoryOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Layout, Modal, Select, Space, Spin, Table, Tag, Typography, message, notification } from "antd";
import { Payout, Transaction } from "models/types";
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
  const [comment, setComment] = useState('');
  const [payout_id, setPayoutId] = useState<string>("");
  const [logPayouts, setLogPayouts] = useState<Payout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedPayoutNo, setSelectedPayoutNo] = useState<string>('');
  const fetchPayouts = async () => {
    setLoading(true);
    try {
      const response = await getPayouts(1, 10);
      // setData(Array.isArray(response) ? response : []);
      setData(response);
    } catch (error: any) {
      notification.error({
        message: "Failed to get Payouts!",
        description:
          error.message || "Failed to get Payouts. Please try again.",
      });
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  const onUpdateStatusPayout = async (payoutId: string, newStatus: string, comment: string) => {
    try {
      const response = await updateStatusPayout(payoutId, newStatus, comment);
      if (response) {
        message.success('Changed Status Successfully!');
        setData(prevData =>
          prevData.map(payout =>
            payout._id === payoutId ? { ...payout, status: newStatus } : payout
          )
        );
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to update Status Payout!",
        description:
          error.message || "Failed to update Status Payout. Please try again.",
      });
    }
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
  
  const handleSearch = (value: string) => {
    const filteredData = data.filter((item) =>
      item.payout_no.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  const showLogPayouts = async (payoutId: string) => {
    setPayoutId(payoutId);
    setLoading(true);
    try {
      const payout = data.find(p => p._id === payoutId);
      if (payout) {
        setTransactions(payout.transactions);
        setSelectedPayoutNo(payout.payout_no);
      }
    } catch (error) {
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
      setLogModalVisible(true);
    }
  };

  const hideLogModal = () => {
    setLogModalVisible(false);
  };
  
  const columns = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
      width: 150,
      render: (name: string, record: Payout) => (
        <a onClick={() => showLogPayouts(record._id)}>{name}</a>
      ),
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
      width: 150,
    },
    {
      title: "Balance Instructor Paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      width: 220,
      align: 'end' as AlignType,
    },
    {
      title: "Balance Instructor Received",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      width: 220,
      align: 'end' as AlignType,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      align: 'center' as AlignType,
      render: (status: string, record: Payout) => {
        let color: string;
        let statusText: string;
  
        switch (status) {
          case 'new':
            color = '#999999';
            statusText = 'New';
            break;
          case 'request_payout':
            color = 'blue';
            statusText = 'Request Paid';
            break;
          case 'completed':
            color = 'green';
            statusText = 'Completed';
            break;
          case 'rejected':
            color = 'red';
            statusText = 'Rejected';
            break;
          default:
            color = 'default';
            statusText = 'Unknown';
        }
  
        return (
          <div className="flex flex-col items-center justify-center">
            <Tag color={color}>{statusText}</Tag>
            {status === 'request_payout' ? (
              <div className="flex flex-row gap-1 my-2 text-xs">
                <Button
                  type="primary"
                  size="small"
                  className="text-xs bg-blue-500"
                  icon={<CheckOutlined />}
                  onClick={() => {
                    Modal.confirm({
                      title: "Send Request Payout Confirmation!",
                      content: (
                        <>
                        <p className="mb-3">Are you sure you want to <strong>Complete Request Payout</strong>?</p>
                          <Input.TextArea
                            name="comment"
                            rows={4}
                            placeholder="Enter a comment (optional)"
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </>
                      ),
                      onOk: () => onUpdateStatusPayout(record._id, 'completed', comment),
                      onCancel: () => setComment(''),
                    });
                  }}
                />
                <Button
                  type="primary"
                  size="small"
                  className="bg-red-500"
                  icon={<CloseOutlined />}
                  onClick={() => {
                    Modal.confirm({
                      title: "Send Request Payout Confirmation!",
                      content: (
                        <>
                        <p className="mb-3">Are you sure you want to <strong>Reject Request Payout</strong>?</p>
                          <Input.TextArea
                            name="comment"
                            rows={4}
                            placeholder="Enter a comment (optional)"
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </>
                      ),
                      onOk: () => onUpdateStatusPayout(record._id, 'rejected', comment),
                      onCancel: () => setComment(''),
                    });
                  }}
                />
              </div>
            ) : null}
          </div>
        );
      },
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

      <Modal
          visible={logModalVisible}
          onCancel={hideLogModal}
          footer={null}
          width={1000}
        >
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <h1 className="mb-2 text-base font-bold">Transactions</h1>
              <p className="mb-5 text-xs italic">* Transactions for the purchases Payout</p>
              <p className="mb-4 text-sm">Payout No: <span className="font-semibold">{selectedPayoutNo}</span></p>
              {error && <p className="text-red-500">{error}</p>}
              {transactions.length === 0 ? (
                <p>No transactions available.</p>
              ) : (
                <Table
                  dataSource={transactions}
                  columns={[
                    {
                      title: 'Transaction ID',
                      dataIndex: '_id',
                      key: '_id',
                    },
                    {
                      title: 'Price Paid',
                      dataIndex: 'price_paid',
                      key: 'price_paid',
                      align: 'end' as AlignType
                    },
                    {
                      title: 'Price',
                      dataIndex: 'price',
                      key: 'price',
                      align: 'end' as AlignType
                    },
                    {
                      title: 'Discount',
                      dataIndex: 'discount',
                      key: 'discount',
                      align: 'end' as AlignType
                    },
                    {
                      title: 'Purchase ID',
                      dataIndex: 'purchase_id',
                      key: 'purchase_id',
                    },
                    {
                      title: 'Created At',
                      dataIndex: 'created_at',
                      key: 'created_at',
                      render: (date: Date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
                    },
                  ]}
                  pagination={false}
                  scroll={{ x: 'max-content' }}
                />
              )}
            </>
          )}
        </Modal>
    </Layout>
  );
}

export default PayoutsAdmin;
