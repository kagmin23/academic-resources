import React, { useState } from 'react';
import FlagIcon from '@mui/icons-material/Flag';
import { Form, Input, Button, Checkbox } from 'antd';
const { TextArea } = Input;

export default function Report() {
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleCheckboxChange = (check: boolean) => {
    setShowOtherInput(check);
  };
  
  return (
    <div className="bg-gray-100 p-4 md:p-8 lg:p-12">
      <div className="text-2xl mb-4 flex items-center">
        <FlagIcon className="mr-2" />
        <span className=' font-semibold'>Report history</span>
      </div>
      <h1 className="text-xl font-semibold mb-2">Thanks for reporting</h1>
      <p className="mb-4 text-gray-600 text-xl">Any member of the Cursus community can flag content to us that they believe violates our Community Guidelines. When something is flagged, it’s not automatically taken down. Flagged content is reviewed in line with the following guidelines:</p>
      <div className="mb-6 text-gray-600 text-xl">
        <ul className="list-disc pl-5 mb-4">
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
          <Button type="primary" htmlType="submit" className="w-full text-xl p-7 bg-blue-500 ">
            Submit Report
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
