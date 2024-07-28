import { Button, Card, Checkbox, Modal, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCart, getCarts, updateCartStatus } from 'services/All/cartApiService';
import sp from '../assets/sp.jpg';

interface Cart {
  _id: string;
  course_name: string;
  instructor_name: string;
  image_url?: string;
  price: number;
  discount: number;
  status: string;
  cart_no: string;
}

const statusColors: { [key: string]: string } = {
  new: 'blue',
  waiting_paid: 'orange',
  cancel: 'red',
  completed: 'green',
};

const ShoppingCart: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCarts, setSelectedCarts] = useState<{ _id: string, cart_no: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [cartToDelete, setCartToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCarts() {
      setLoading(true);
      try {
        const response = await getCarts('', 1, 10);
        if (response.data && Array.isArray(response.data.pageData)) {
          const filteredCarts = response.data.pageData.filter((cart: Cart) => cart.status !== 'completed');
          setCarts(filteredCarts);
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCarts();
  }, []);

  const showDeleteModal = (courseId: string) => {
    setCartToDelete(courseId);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (cartToDelete) {
      try {
        await deleteCart(cartToDelete);
        setCarts((prevCarts) =>
          prevCarts.filter((cart) => cart._id !== cartToDelete)
        );
        setSelectedCarts((prevSelected) =>
          prevSelected.filter((id) => id._id !== cartToDelete)
        );
        setIsModalVisible(false);
        setCartToDelete(null);
      } catch (error) {
        console.error('Failed to delete cart item:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCartToDelete(null);
  };

  const handleCheckboxChange = async (courseId: string, checked: boolean, cart_no: string) => {
    setSelectedCarts((prevSelected) =>
      checked
        ? [...prevSelected, { _id: courseId, cart_no }]
        : prevSelected.filter((id) => id._id !== courseId)
    );

    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart._id === courseId ? { ...cart, status: checked ? 'waiting_paid' : 'new' } : cart
      )
    );

    try {
      const status = checked ? 'waiting_paid' : 'new';
      await updateCartStatus(status, [{ _id: courseId, cart_no }]);
    } catch (error) {
      console.error('Failed to update cart status:', error);
    }
  };

  const handleProceedToCheckout = async () => {
    try {
      const cartsToCheckout = selectedCarts
        .filter((selectedCart) => {
          const cart = carts.find((cart) => cart._id === selectedCart._id);
          return cart && cart.status === 'waiting_paid';
        });

      if (cartsToCheckout.length === 0) {
        console.error('No carts are selected or have incorrect status.');
        return;
      }

      // Proceed to checkout and pass selected carts data
      navigate('/student/check-out', { state: { cartsToCheckout } });

    } catch (error) {
      console.error('Failed to proceed to checkout:', error);
    }
  };

  const selectedTotalPrice = carts
    .filter((cart) => selectedCarts.some((selectedCart) => selectedCart._id === cart._id))
    .reduce((total, cart) => total + cart.price * (1 - cart.discount), 0);

  return (
    <div className="w-full min-h-screen mx-auto bg-gray-200">
      <div className="p-3 mb-4 font-bold md:text-2xl sm:text-lg bg-stone-50 md:px-32">
        Shopping Cart
      </div>
      <div className="flex flex-col flex-grow w-5/6 pt-5 pb-20 mx-auto lg:flex-row">
        <div className="w-full p-4 mr-3 item lg:w-2/3">
          <Card title={<div style={{ fontSize: '24px', fontWeight: 'bold' }}>Your carts</div>}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              carts.map((cart) => (
                <Card.Grid key={cart._id} style={{ width: '100%' }} className="md:flex">
                  <Checkbox
                    className="mr-4"
                    checked={selectedCarts.some((selectedCart) => selectedCart._id === cart._id)}
                    onChange={(e) => handleCheckboxChange(cart._id, e.target.checked, cart.cart_no)}
                  />
                  <img
                    src={cart.image_url || sp}
                    alt="Product"
                    className="w-4/5 h-24 mx-auto md:w-1/3 md:h-36"
                  />

                  <div className="w-full md:flex md:w-2/3">
                    <div className="flex-grow mx-4">
                      <div className="w-full font-bold text-center md:text-lg sm:text-sm md:text-left">
                        {cart.course_name}
                      </div>
                      <div className="w-full font-medium text-center md:text-base sm:text-xs text-slate-500 md:text-left">
                        By: {cart.instructor_name}
                      </div>
                      <div className='flex flex-row mt-5 font-medium text-slate-500'>
                        <Tag color={statusColors[cart.status]}>
                          {cart.status.replace('_', ' ')}
                        </Tag>
                      </div>
                    </div>
                    <div className="justify-center">
                      <div className="font-semibold">
                        <div className="flex justify-center md:justify-end">
                          <span className="mr-2 text-lg line-through">{cart.price.toLocaleString('vi-VN')} đ</span>
                          <span className="text-lg">({cart.discount * 100}%)</span>
                        </div>
                        <div className="text-lg text-red-500">
                          {(cart.price * (1 - cart.discount)).toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                      <Button
                        danger
                        className="w-full mt-5 text-xs font-bold text-center md:mt-16"
                        onClick={() => showDeleteModal(cart._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Grid>
              ))
            )}
          </Card>
        </div>
        <div className="w-full p-4 item lg:w-1/3">
          <Card>
            <Card.Grid style={{ width: '100%' }}>
              <div className="flex flex-col">
                <div className="font-bold text-center md:text-lg sm:text-base">
                  Total Price:
                </div>
                <div className="m-3 text-xl font-bold text-center text-red-500 md:text-xl sm:text-lg">
                  {selectedTotalPrice.toLocaleString('vi-VN')} đ
                </div>
                <Button
                  type="primary"
                  className="w-full"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </Card.Grid>
          </Card>
        </div>
      </div>

      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this item from your cart?</p>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
