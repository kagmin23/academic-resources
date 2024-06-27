import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Dropdown, Input, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const { Search } = Input;

interface Result {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

interface MenuItems {
  [key: string]: string[];
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage: React.FC = () => {
  const query = useQuery();
  const [searchTerm, setSearchTerm] = useState(query.get('query') || '');
  const [filters, setFilters] = useState<string[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);

  const allResults: Result[] = [
    {
      id: 1,
      title: 'Result 1',
      description: 'Description for result 1',
      price: '$100',
      image: 'https://images.prismic.io/aje-cms-production/7161ed4f-56d5-44ff-9d1f-136d6027166a_hero-academic-vs-nonacademic-writing.png?auto=compress,format',
    },
    {
      id: 2,
      title: 'Result 2',
      description: 'Description for result 2',
      price: '$200',
      image: 'https://prod-aaudxp-cms-001-app.azurewebsites.net/media/xi4oukcq/_2wb5652.jpg?width=960',
    },
    {
      id: 3,
      title: 'Result 3',
      description: 'Description for result 3',
      price: '$300',
      image: 'https://cms.prepedu.com/uploads/academic_writing_practice_for_ielts_57d6ceab74.jpg',
    },
  ];

  const menuItems: MenuItems = {
    Topic: ['Topic 1', 'Topic 2', 'Topic 3'],
    Category: ['Category 1', 'Category 2', 'Category 3'],
    Price: ['Price 1', 'Price 2', 'Price 3'],
    Level: ['Beginner', 'Intermediate', 'Advanced'],
    Language: ['English', 'Spanish', 'French'],
    Features: ['Feature 1', 'Feature 2', 'Feature 3'],
    Rating: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
  };

  useEffect(() => {
    const filtered = allResults.filter((result) =>
      result.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
  }, [searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (checkedValues: any) => {
    setFilters(checkedValues);
  };

  const renderMenu = (options: string[]) => (
    <Menu>
      {options.map((option) => (
        <Menu.Item key={option}>
          <Checkbox value={option} onChange={(e) => handleFilterChange(e.target.value)}>
            {option}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="flex flex-col p-4 md:flex-row">
      <div className="w-full md:w-3/4">
        <Search
          placeholder="Search..."
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <h1 className="mt-4 text-2xl font-bold md:text-4xl lg:text-3xl md:mt-6 lg:mt-8">Search Results</h1>
        <div className="mt-4">
          {filteredResults.map((result) => (
            <Card key={result.id} className="mb-4">
              <div className="flex">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{result.title}</h3>
                  <p>{result.description}</p>
                  <p className="font-semibold">{result.price}</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <img src={result.image} alt={result.title} className="object-cover w-32 h-32" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="w-full mt-4 md:w-1/4 md:mt-0 md:ml-4">
        <Card title="Filters">
          {Object.keys(menuItems).map((key) => (
            <Dropdown key={key} overlay={renderMenu(menuItems[key])} trigger={['hover']} className="mb-2">
              <div className="p-2 cursor-pointer hover:bg-gray-200">{key}</div>
            </Dropdown>
          ))}
          <Button className="mt-2" type="primary" onClick={() => {}}>
            Submit
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;
