import { Layout, Table, Typography } from 'antd';
import React from 'react';
  // import debounce from 'lodash/debounce';
  
  const { Header, Content, Footer } = Layout;
  const { Title, Text } = Typography;
  

interface DataType {
    key: string;
    image: string;
    title: string;
    status: boolean;
    description: string;
    price: number;
    created_at: string;
    instructor: string;
  }

  const ViewSession: React.FC = () => {

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
        {
            title: 'position_order',
            dataIndex: 'position_order',
            key: 'position_order',
          },
          {
            title: 'Create At',
            dataIndex: 'created_at',
            key: 'created_at',
          },
          {
            title: 'Update At',
            dataIndex: 'update_at',
            key: 'update_at',
          },
          {
            title: 'Is deleted',
            dataIndex: 'is_deleted',
            key: 'is_deleted',
          },
      ];
      


  return (
    <div>
      <Table columns={columns} />;
    </div>
  )
}

export default ViewSession