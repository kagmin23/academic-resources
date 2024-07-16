import { BookOutlined, FieldTimeOutlined, HomeOutlined, IssuesCloseOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Layout.Footer className="text-white bg-gray-800">
      <div className="container px-4  mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold"><BookOutlined />&nbsp;&nbsp;&nbsp;ACADEMIC_RESOURCES</h2>
            <ul className="mt-4">
              <li className="mb-2"><PhoneOutlined />&nbsp;&nbsp;&nbsp;(+84) 342-555-702</li>
              <li className="mb-2"><HomeOutlined />&nbsp;&nbsp;&nbsp;One Hub Building Thu Duc, VietNam</li>
              <li className="mb-2"><MailOutlined />&nbsp;&nbsp;&nbsp;phankangmin@gmail.com</li>
              <li className="mb-2"><FieldTimeOutlined />&nbsp;&nbsp;&nbsp;Date/Time: 08:00 AM - 5:00 PM</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Monday to Friday</li>
              <li><IssuesCloseOutlined />&nbsp;&nbsp;&nbsp;Close: Saturday and Sunday</li>
            </ul>
          </div>
          <div className="flex flex-wrap">
              <a href="#" className="mb-2 mr-4">Buy Now</a>
              <a href="#" className="mb-2 mr-4">Menu</a>
              <a href="#" className="mb-2 mr-4">Courses</a>
              <a href="#" className="mb-2 mr-4">Topics</a>
              <a href="#" className="mb-2 mr-4">Information for Prospective Students</a>
              <a href="#" className="mb-2 mr-4">Classes</a>
              <a href="#" className="mb-2 mr-4">Painting</a>
              <a href="#" className="mb-2 mr-4">Certification</a>
              <a href="#" className="mb-2 mr-4">Prospective Students</a>
              <a href="#" className="mb-2 mr-4">Programs</a>
              <a href="#" className="mb-2 mr-4">Sketching</a>
              <a href="#" className="mb-2 mr-4">Disclosure</a>
              <a href="#" className="mb-2 mr-4">Parents and Families</a>
              <a href="#" className="mb-2 mr-4">About Us</a>
              <a href="#" className="mb-2 mr-4">Drawing</a>
              <a href="#" className="mb-2 mr-4">Student Code</a>
              <a href="#" className="mb-2 mr-4">Transfer Students</a>
              <a href="#" className="mb-2 mr-4">Contact</a>
              <a href="#" className="mb-2 mr-4">Digital</a>
              <a href="#" className="mb-2 mr-4">Campus Safety</a>
              <a href="#" className="mb-2 mr-4">Military Students</a>
            </div>
        </div>
        <div className="pt-4 mt-8 text-sm text-center border-t border-gray-700 md:text-left">
          Riêng tư | Điều khoản | Sơ đồ trang web | Mua
        </div>
      </div>
    </Layout.Footer>
  );
};

export default Footer;