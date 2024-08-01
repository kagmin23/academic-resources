import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Dropdown, Input, Menu, message } from 'antd';
import { Category, ClientCourses } from 'models/types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCategories, getCourses } from 'services/UserClient/clientApiService';

const { Search } = Input;

interface MenuItems {
  [key: string]: string[];
}
interface ApiResponse {
  success: boolean;
  data: {
    pageData: any[];
  };
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage: React.FC = () => {
  const query = useQuery();
  const [searchTerm, setSearchTerm] = useState(query.get('query') || '');
  const [filters, setFilters] = useState<string[]>([]);
  const [searchCourses, setSearchCourses] = useState<ClientCourses[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItems>({});
  const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response: ApiResponse = await getCourses('', '', 1, 10);
        if (response.success) {
          setSearchCourses(response.data.pageData);
        } else {
          message.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        message.error('An error occurred. Please try again later.');
      } finally {
        setLoadingCourses(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response: ApiResponse = await getCategories('', 1, 10);
        if (response.success) {
          setCategories(response.data.pageData);
        } else {
          message.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        message.error('An error occurred. Please try again later.');
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCourses();
    fetchCategories();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // debouncedSearch(value);
  };

  const handleFilterChange = (filter: string) => {
    setFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const applyFilters = async () => {
    try {
      const data = await getCourses(searchTerm, '', 1, 10);
      const filtered = data.courses.filter((course: ClientCourses) =>
        filters.every((filter) =>
          course.category_name.includes(filter) ||
          course.instructor_name.includes(filter)
        )
      );
      setSearchCourses(filtered);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };
  
  useEffect(() => {
    if (filters.length > 0) {
      applyFilters();
    }
  }, [filters]);

  const renderMenu = (options: string[]) => (
    <Menu>
      {options.map((option) => (
        <Menu.Item key={option}>
          <Checkbox
            checked={filters.includes(option)}
            onChange={() => handleFilterChange(option)}
          >
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
          onChange={(e) => handleSearch(e.target.value)}
        />
        <h1 className="mt-4 text-2xl font-bold md:text-4xl lg:text-3xl md:mt-6 lg:mt-8">Search Results</h1>
        <div className="mt-4">
          {searchCourses.map((result) => (
            <Card
              key={result._id}
              title={<h3 className="text-xl font-bold">{result.name}</h3>}
              cover={<img className="w-full h-40" alt={result.name} src={result.image_url} />}
              className="mb-4"
            >
              <p className="text-gray-600">{result.category_name}</p>
              <p className="text-gray-600">Instructor: {result.instructor_name}</p>
              <p className="text-gray-600">Rating: {result.average_rating.toFixed(1)}</p>
              <p>{result.description}</p>
              <p className="font-semibold">${result.price.toFixed(2)}</p>
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
          <Button className="mt-2" type="primary" onClick={applyFilters}>
            Apply
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;
