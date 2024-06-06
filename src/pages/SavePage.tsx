import React, { useState } from 'react';
import { Button, List, Card } from 'antd';
import { MoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';

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
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Rating Count: {ratingCount}</p>
      <p>Published: {published}</p>
    </div>
  );
};

const SavePage: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cartHoveredIndex, setCartHoveredIndex] = useState<number | null>(null);
  const [showRemoveButton, setShowRemoveButton] = useState<boolean>(false);

  return (
    <div className="mx-auto p-9 flex flex-row">
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Saved Courses</h2>
        <p className="mb-2">4 Courses</p>
        <Button type="primary" danger className="mb-4 w-full text-xl p-5">Remove All</Button>
      </div>

      <div className="w-3/4 p-4">
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
                <div className="flex relative text-xl font-semibold">
                  <a href='#'><img src={item.img} alt={item.title} className="w-62 h-62 object-cover mr-4" /></a>
                  <CustomMeta ratingCount={item.ratingCount} published={item.published} title={item.title} description={item.category} />
                  <div className="absolute top-0 right-0 m-2 flex flex-col items-center space-y-1 text-2xl">
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
                  {hoveredIndex === index && (
                    <div
                      className="absolute top-20 right-0 m-2 flex flex-row items-center space-x-2 text-2xl font-semibold"
                      onMouseEnter={() => setCartHoveredIndex(index)}
                      onMouseLeave={() => setCartHoveredIndex(null)}
                    >
                      <a href="#" className={cartHoveredIndex === index ? 'text-red-500' : ''}>
                        <ShoppingCartOutlined className={cartHoveredIndex === index ? 'text-red-500' : ''} />
                      </a>
                      <span className={cartHoveredIndex === index ? 'text-red-500 font-semibold' : ''}>{item.price}</span>
                    </div>
                  )}
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
