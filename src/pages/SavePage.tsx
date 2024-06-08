
import { MoreOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Button, Card, List } from 'antd';
import React, { useState } from 'react';

const savedCourses = [
  {
    title: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
    category: 'Web Development | Python',
    rating: 'BESTSELLER',
    ratingCount: '109k views',
    published: '15 days ago',
    duration: '4.5 hours',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwda7oiFwLbyvfUGDMU6rR6N7jAG8LnrzZg&s',
    price: '$5',
  },
  {
    title: 'The Complete JavaScript Course 2020: Build Real Projects!',
    category: 'Web Development | Python',
    rating: '',
    ratingCount: '5M views',
    published: '15 days ago',
    duration: '15 days ago',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwda7oiFwLbyvfUGDMU6rR6N7jAG8LnrzZg&s',
    price: '$5',
  },
  {
    title: 'Beginning C++ Programming - From Beginner to Beyond',
    category: 'Web Development | Python',
    rating: '',
    ratingCount: '5M views',
    published: '15 days ago',
    duration: '15 days ago',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwda7oiFwLbyvfUGDMU6rR6N7jAG8LnrzZg&s',
    price: '$5',

  },
  {
    title: 'The Complete Digital Marketing Course - 12 Courses in 1',
    category: 'Web Development | Python',
    rating: '',
    ratingCount: '5M views',
    published: '15 days ago',
    duration: '15 days ago',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwda7oiFwLbyvfUGDMU6rR6N7jAG8LnrzZg&s',
    price: '$5',

  }
];

interface CustomMetaProps {
  ratingCount: string;
  published: string;
  title: string;
  description: string;
}

const CustomMeta: React.FC<CustomMetaProps> = ({ ratingCount, published, title, description }) => {
  return (
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <p className="text-gray-500">Rating Count: {ratingCount}</p>
      <p className="text-gray-500">Published: {published}</p>
    </div>
  );
};

const SavePage: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [shoppingHoveredIndex, setShoppingHoveredIndex] = useState<number | null>(null);
  const [shoppingCartHoveredIndex, setShoppingCartHoveredIndex] = useState<number | null>(null);
  const [showRemoveButton, setShowRemoveButton] = useState<boolean>(false);

  return (

    <div className="flex flex-col p-4 mx-auto lg:flex-row lg:p-9">
      <div className="w-full p-4 mb-4 bg-gray-100 lg:w-1/4 lg:mb-0">
        <h2 className="mb-4 text-xl font-bold">Saved Courses</h2>
        <p className="mb-2">4 Courses</p>
        <Button type="primary" danger className="w-full p-3 mb-4 text-xl lg:p-5">Remove All</Button>
      </div>

      <div className="w-full p-4 lg:w-3/4">
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={savedCourses}
          renderItem={(item, index) => (
            <List.Item>
              <Card
                hoverable
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >

                <div className="relative flex flex-col text-xl font-semibold md:flex-row">
                  <a href='/course-details'><img src={item.img} alt={item.title} className="object-cover w-full h-48 mb-4 md:mb-0 md:mr-4 md:w-48" /></a>
                  <a href='/course-details'><CustomMeta ratingCount={item.ratingCount} published={item.published} title={item.title} description={item.category} /></a>

                  <div className="absolute top-0 right-0 flex flex-col items-center m-2 space-y-1 text-2xl">
                    <div
                      onMouseEnter={() => setShowRemoveButton(true)}
                      onMouseLeave={() => setShowRemoveButton(false)}
                    >
                      <MoreOutlined />
                      {showRemoveButton && hoveredIndex === index && (
                        <Button type="primary" danger size="middle" className="mt-2">Remove</Button>
                      )}
                    </div>
                  </div>

                  <div className="absolute right-0 flex flex-row items-center m-2 space-x-2 text-2xl font-semibold top-20">
                    <a
                      href="#"
                      onMouseEnter={() => setShoppingHoveredIndex(index)}
                      onMouseLeave={() => setShoppingHoveredIndex(null)}
                      className={shoppingHoveredIndex === index ? 'text-red-500' : ''}
                    >
                      <ShoppingOutlined className={shoppingHoveredIndex === index ? 'text-blue-600' : ''} />
                    </a>
                    <span className={shoppingCartHoveredIndex === index ? 'text-red-500 font-semibold' : ''}>{item.price}</span>
                    <a
                      href="/buy-now"
                      onMouseEnter={() => setShoppingCartHoveredIndex(index)}
                      onMouseLeave={() => setShoppingCartHoveredIndex(null)}
                      className={shoppingCartHoveredIndex === index ? 'text-red-500' : ''}
                    >
                      <ShoppingCartOutlined className={shoppingCartHoveredIndex === index ? 'text-red-500' : ''} />
                    </a>
                  </div>

                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default SavePage;
