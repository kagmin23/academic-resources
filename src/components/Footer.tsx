import { BookOutlined, FieldTimeOutlined, HomeOutlined, IssuesCloseOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Layout.Footer className="text-white bg-gray-800">
      <div className="container px-4 py-8 mx-auto">
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
            <a href="#" className="mb-2 mr-4">Mua ngay</a>
            <a href="#" className="mb-2 mr-4">Menu</a>
            <a href="#" className="mb-2 mr-4">Khóa học</a>
            <a href="#" className="mb-2 mr-4">Chủ đề</a>
            <a href="#" className="mb-2 mr-4">Thông tin cho sinh viên tiềm năng</a>
            <a href="#" className="mb-2 mr-4">Lớp học</a>
            <a href="#" className="mb-2 mr-4">Vẽ tranh</a>
            <a href="#" className="mb-2 mr-4">Chứng nhận</a>
            <a href="#" className="mb-2 mr-4">Sinh viên tiềm năng</a>
            <a href="#" className="mb-2 mr-4">Chương trình</a>
            <a href="#" className="mb-2 mr-4">Phác thảo</a>
            <a href="#" className="mb-2 mr-4">Tiết lộ</a>
            <a href="#" className="mb-2 mr-4">Cha mẹ và gia đình</a>
            <a href="#" className="mb-2 mr-4">Về chúng tôi</a>
            <a href="#" className="mb-2 mr-4">Vẽ</a>
            <a href="#" className="mb-2 mr-4">Mã sinh viên</a>
            <a href="#" className="mb-2 mr-4">Sinh viên chuyển tiếp</a>
            <a href="#" className="mb-2 mr-4">Liên hệ</a>
            <a href="#" className="mb-2 mr-4">Kỹ thuật số</a>
            <a href="#" className="mb-2 mr-4">An toàn khuôn viên</a>
            <a href="#" className="mb-2 mr-4">Sinh viên quân đội</a>
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