import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Dropdown, Input, Menu } from 'antd';
import debounce from 'lodash/debounce';
import { ClientCourses } from 'models/types';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCourses } from 'services/UserClient/clientApiService';

const { Search } = Input;
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
  const [filteredResults, setFilteredResults] = useState<ClientCourses[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItems>({}); // Initialize menuItems

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      try {
        const data = await getCourses(value, '', 1, 10); // Adjust pageNum and pageSize as needed
        setFilteredResults(data.courses || []); // Ensure data.courses is an array
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }, 500), // Adjust debounce delay as needed
    []
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
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
      setFilteredResults(filtered);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

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

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    if (filters.length > 0) {
      applyFilters();
    }
  }, [filters]);

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
          {filteredResults.map((result) => (
            <Card key={result._id} className="mb-4">
              <div className="flex">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{result.name}</h3>
                  <p className="text-gray-600">{result.category_name}</p>
                  <p className="text-gray-600">Instructor: {result.instructor_name}</p>
                  <p className="text-gray-600">Rating: {result.average_rating.toFixed(1)}</p>
                  <p>{result.description}</p>
                  <p className="font-semibold">${result.price.toFixed(2)}</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <img src={result.image_url} alt={result.name} className="object-cover w-32 h-32" />
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
          <Button className="mt-2" type="primary" onClick={applyFilters}>
            Apply
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;
