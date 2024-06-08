import { ArrowLeftOutlined } from '@ant-design/icons';
import FlagIcon from '@mui/icons-material/Flag';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import '../styles/ReportPage.css';
const { TextArea } = Input;

export default function Report() {
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleCheckboxChange = (check: boolean) => {
    setShowOtherInput(check);
  };
  
  return (
    <div className="p-4 bg-gray-100 md:p-8 lg:p-12">
      <Link to="/"><Button className="mb-6"><ArrowLeftOutlined />Back to Home</Button></Link>
      <div className="flex items-center mb-4 text-2xl">
        <FlagIcon className="mr-2" />
        <span className='font-semibold '>Report history</span>
      </div>
      <h1 className="mb-2 text-xl font-semibold">Thanks for reporting</h1>
      <p className="mb-4 text-xl text-gray-600">Any member of the Cursus community can flag content to us that they believe violates our Community Guidelines. When something is flagged, it’s not automatically taken down. Flagged content is reviewed in line with the following guidelines:</p>
      <div className="mb-6 text-xl text-gray-600">
        <ul className="pl-5 mb-4 list-disc">
          <li>Content that violates our <a href='/' className='text-blue-700'>Community Guidelines</a> is removed from Edututs+.</li>
          <li>Content that may not be appropriate for all younger audiences may be age-restricted.</li>
        </ul>
        <a href="/" className='text-blue-600'>Learn more about reporting content on Cursus.</a>
      </div>
      <div>
        <ul>
          <li><Checkbox className='text-xl text-gray-600'>Misinformation or Inaccuracy</Checkbox></li>
          <li><Checkbox className='text-xl text-gray-600'>Plagiarism or Copyright Infringement</Checkbox></li>
          <li><Checkbox className='text-xl text-gray-600'>Lack of Sources or References</Checkbox></li>
          <li><Checkbox className='text-xl text-gray-600'>Duplicate Content</Checkbox></li>
          <li><Checkbox className='text-xl text-gray-600'>Lack of Professionalism or Academic Standards</Checkbox></li>
          <li><Checkbox className='text-xl text-gray-600'>Information is incomplete or fragmentary</Checkbox></li>
          <li><Checkbox className='text-xl text-gray-600'>Misrepresentation of data or results</Checkbox></li>
          <li><Checkbox className='text-xl text-gray-600'>Irrelevant or off-topic content</Checkbox></li>
          <li><Checkbox className='text-xl text-gray-600'>Ethical violation</Checkbox></li>
          <li><Checkbox className='text-xl text-gray-600'>Violations of academic integrity</Checkbox></li>
          <li>
            <Checkbox
              className='text-xl text-gray-600'
              onChange={(e) => handleCheckboxChange(e.target.checked)}
            >
              Other
            </Checkbox>
            {showOtherInput && (
              <Form.Item
                name="reason"
                rules={[{ required: true, message: 'Please input the reason for reporting!' }]}
              >
                <TextArea rows={5} />
              </Form.Item>
            )}
          </li>
        </ul>
      </div>
      <Form
        name="report"
        layout="vertical"
        initialValues={{ remember: true }}
        className="max-w-lg mx-auto"
      >
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full text-xl bg-blue-500 p-7 ">
            Submit Report
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}