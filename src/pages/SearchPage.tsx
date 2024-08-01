import { SearchOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Input, Select, Slider, Spin, Typography, message } from 'antd';
import { Category, ClientCourses } from 'models/types';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategories, getCourses } from 'services/UserClient/clientApiService';

const { Search } = Input;
const { Text } = Typography;
const { Option } = Select;

interface ApiResponse {
  success: boolean;
  data: {
    pageData: any[];
  };
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const priceRanges = [
  { label: '$0 - $500000', min: 0, max: 500000 },
  { label: '$500000 - $1000000', min: 500000, max: 1000000 },
  { label: '$1000000 - $2000000', min: 1000000, max: 2000000 },
  { label: '$2000000 - $3000000', min: 2000000, max: 3000000 },
  { label: '$3000000 - $4000000', min: 3000000, max: 4000000 },
  { label: 'Over $5000000', min: 5000000, max: Infinity },
];

const SearchPage: React.FC = () => {
  const query = useQuery();
  const [searchTerm, setSearchTerm] = useState(query.get('query') || '');
  const [filtersCategories, setFiltersCategories] = useState<string[]>([]);
  const [searchCourses, setSearchCourses] = useState<ClientCourses[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [hasData, setHasData] = useState<boolean>(true);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<{ min: number; max: number }[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response: ApiResponse = await getCourses('', '', 1, 10);
        if (response.success) {
          setSearchCourses(response.data.pageData);
          setHasData(response.data.pageData.length > 0);
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
    applyFilters(value);
  };

  const handleFilterChange = (value: string[]) => {
    setFiltersCategories(value);
    applyFilters(searchTerm);
  };

  const handlePriceFilterChange = (checkedValues: any[]) => {
    const ranges = priceRanges.filter((range, index) => checkedValues.includes(index));
    setSelectedPriceRanges(ranges);
    applyFilters(searchTerm);
  };

  const clearFilters = () => {
    setFiltersCategories([]);
    setRatingRange([0, 5]);
    setSelectedPriceRanges([]);
    applyFilters(searchTerm);
    navigate(0);
  };
  

  const applyFilters = async (term: string) => {
    try {
      const response: ApiResponse = await getCourses(term, '', 1, 10);
      if (response.success) {
        const filtered = response.data.pageData.filter((course: ClientCourses) =>
          filtersCategories.every((filter) =>
            course.category_name.includes(filter) ||
            course.instructor_name.includes(filter)
          ) ||
          course.average_rating >= ratingRange[0] ||
          course.average_rating <= ratingRange[1] ||
          selectedPriceRanges.some(range =>
            course.price >= range.min &&
            course.price <= range.max
          )
        );
        setSearchCourses(filtered);
        setHasData(filtered.length > 0);
      } else {
        message.error('Failed to fetch filtered courses');
      }
    } catch (error) {
      console.error('Error applying filters:', error);
      message.error('An error occurred while applying filters.');
    }
  };

  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category.name,
  }));

  const renderContent = () => {
    if (loadingCourses) {
      return (
        <div className="flex items-center justify-center h-full">
          <Spin size="large" />
        </div>
      );
    }

    if (hasData) {
      return searchCourses.map((result) => (
        <div key={result._id} className="flex p-4 mb-4 border rounded-lg">
          <div className="flex-shrink-0 w-32 h-32 mr-4">
            <img
              className="object-cover w-full h-full"
              alt={result.name}
              src={result.image_url}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">{result.name}</h3>
            <p className="text-gray-600">{result.category_name}</p>
            <p className="text-gray-600">Instructor: {result.instructor_name}</p>
            <p className="text-gray-600">Rating: {result.average_rating.toFixed(1)}</p>
            <p>{result.description}</p>
            <p className="font-semibold">${result.price.toFixed(2)}</p>
          </div>
        </div>
      ));
    }

    return (
      <div className="flex flex-col items-center justify-center h-full p-4 pb-44">
        <img
          src="https://static.vecteezy.com/system/resources/previews/010/856/652/non_2x/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg" 
          alt="No data illustration"
          className="w-52 h-52"
        />
        <Text className="text-xl font-semibold">No Results Found</Text>
        <Text className="mt-2 text-gray-600">Try adjusting your search criteria or filters.</Text>
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 p-4 overflow-hidden">
        <h1 className="mb-4 text-2xl font-bold md:text-4xl lg:text-3xl">Search Results</h1>
        <div className="flex-1 w-full overflow-y-auto">
          {renderContent()}
        </div>
      </div>
      <div className="flex flex-col items-center w-1/4 p-4 bg-gray-100 shadow-md">
        <Search
          placeholder="Search..."
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="mb-4"
        />
        <Card title="Filters" className="w-full">
          <p className="opacity-50">Filter by Stars</p>
          <Slider
              range
              min={0}
              max={5}
              step={0.1}
              value={ratingRange}
              onChange={(value) => setRatingRange(value as [number, number])}
              className="mb-10"
              tooltip={{
                formatter: (value) => {
                  const starIcon = <StarOutlined />;
                  return (
                    <div className="flex items-center">
                      {value}&nbsp;{starIcon}
                    </div>
                  );
                }
              }}
            />
            <p className="mb-2 opacity-50">Filter by Price</p>
            <div className="space-x-5">
              <Checkbox.Group
                options={priceRanges.map((range, index) => ({ label: range.label, value: index }))}
                onChange={handlePriceFilterChange}
              />
            </div>
            <p className="mt-4 opacity-50">Filter by Categories</p>
            <Select
              mode="multiple"
              allowClear
              placeholder="Select categories"
              onChange={handleFilterChange}
              className="w-full"
            >
              {categoryOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              onClick={clearFilters}
              className="mt-4"
            >
              Clear Filters
            </Button>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;