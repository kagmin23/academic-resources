import { Button, Card, Col, Divider, Modal, Radio, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCarts, updateCartStatus } from '../services/All/CartApiService';
import Paypal from '../assets/Paypal2.png';
import VNPay from '../assets/VNPay2.jpg';

export interface Cart {
  _id: string;
  cart_no: string;
  status: string;
  price: number;
  discount: number;
  course_id: string;
  course_name: string;
  student_id: string;
  category_name: string;
  instructor_id: string;
  instructor_name: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

interface CheckoutLocationState {
  cartsToCheckout: { _id: string; cart_no: string }[];
}

const statusColors: { [key: string]: string } = {
  new: 'blue',
  waiting_paid: 'orange',
  cancel: 'red',
  completed: 'green',
};

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CheckoutLocationState;
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [actionType, setActionType] = useState<'cancel' | 'complete' | null>(null);

  useEffect(() => {
    if (!state || !state.cartsToCheckout) {
      console.error('No carts selected for checkout');
      return;
    }

    const fetchCarts = async () => {
      try {
        const response = await getCarts('waiting_paid', 1, 10);
        if (response.data && Array.isArray(response.data.pageData)) {
          const filteredCarts = response.data.pageData.filter((cart: Cart) =>
            state.cartsToCheckout.some((selectedCart: { _id: string }) => selectedCart._id === cart._id)
          );
          setCarts(filteredCarts);
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, [state]);

  const handleAction = async () => {
    if (actionType) {
      try {
        const status = actionType === 'cancel' ? 'cancel' : 'completed';

        // Prepare items for update
        const itemsToUpdate = carts.map(cart => ({
          _id: cart._id,
          cart_no: cart.cart_no
        }));

        // Call updateCartStatus with the status and items
        await updateCartStatus(status, itemsToUpdate);

        // Navigate based on actionType
        if (actionType === 'cancel') {
          navigate('/student/shopping-cart');
        } else {
          navigate('/student/payment-successfully');
        }
      } catch (error) {
        console.error('Failed to update cart status:', error);
      } finally {
        setIsModalVisible(false);
        setActionType(null);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setActionType(null);
  };

  const totalPrice = carts.reduce((total, cart) => total + cart.price * (1 - cart.discount), 0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full min-h-screen pb-5 bg-gray-200">
      <div className="p-3 mb-4 font-bold md:text-2xl sm:text-lg bg-stone-50 md:px-32">Checkout</div>
      <div className="flex flex-col flex-grow w-5/6 pt-5 pb-20 mx-auto lg:flex-row">
        <div className="w-full p-4 mr-3 item lg:w-2/3">
          <Card>
            <Row>
              <Col span={16} className='text-lg font-bold'>Products</Col>
              <Col span={8} className='text-lg font-bold'>Price</Col>
            </Row>
            <Divider />
            {carts.map(product => (
              <React.Fragment key={product._id}>
                <Row>
                  <Col span={16}>
                    <div className='flex'>
                      <div className='ml-4'>
                        <div className='text-lg font-medium'>{product.course_name}</div>
                        <div className='mt-4 font-medium text-gray-700'>By: {product.instructor_name}</div>
                        <div className='font-medium text-gray-700'>Category: {product.category_name}</div>
                        <div className='flex flex-row mt-5 font-medium text-slate-500'>
                          <Tag color={statusColors[product.status]}>
                            {product.status.replace('_', ' ')}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8} className='flex items-center font-medium'>{(product.price * (1 - product.discount)).toLocaleString('vi-VN')} đ</Col>
                </Row>
                <Divider />
              </React.Fragment>
            ))}
            <Row>
              <Col span={16} className='text-lg font-medium'>Total products: {carts.length}</Col>
              <Col span={8} className='text-lg font-medium'>Total Price: {totalPrice.toLocaleString('vi-VN')} đ</Col>
            </Row>
          </Card>
        </div>
        <div className="w-full p-4 item lg:w-1/3">
          <Card>
            <div className='text-lg font-bold'>
              <div>
                Payment methods:
              </div>
              <Divider />
              <div>
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio value={1}><img src={VNPay} alt="VNPay" className='mr-4 w-28 h-28' /></Radio>
                  <Radio value={2}><img src={Paypal} alt="Paypal" className='w-28 h-28' /></Radio>
                </Radio.Group>
              </div>
              <Divider />
              <div className='flex justify-end'>
                <Modal
                  title="Confirm Action"
                  visible={isModalVisible}
                  onOk={handleAction}
                  onCancel={handleCancel}
                  okText={actionType === 'cancel' ? "Cancel" : "Complete"}
                  cancelText="Cancel"
                >
                  <p>{actionType === 'cancel' ? 'Are you sure you want to cancel these items?' : 'Are you sure you want to complete the payment?'}</p>
                </Modal>
                <Button
                  className='mr-3 font-medium text-white bg-red-600'
                  onClick={() => {
                    setActionType('cancel');
                    setIsModalVisible(true);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className='font-medium text-white bg-blue-600'
                  onClick={() => {
                    setActionType('complete');
                    setIsModalVisible(true);
                  }}
                >
                  Complete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
