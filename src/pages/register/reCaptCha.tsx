import { Button, Form } from "antd";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// Khai báo state để lưu trữ trạng thái xác thực của reCAPTCHA
const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);

// Hàm xử lý sự kiện khi reCAPTCHA được xác nhận
const onCaptchaChange = (value: string | null) => {
  if (value) {
    setCaptchaVerified(true);
  }
};

// Khai báo form từ Ant Design
const [form] = Form.useForm();

const onNext = () => {
  // Logic xử lý khi nhấn nút Next
};

// Trong form của bạn
<Form form={form} name="signup" initialValues={{ remember: true }} className="space-y-4">
  {/* Các trường khác trong form */}
  
  {/* Thêm Google reCAPTCHA */}
  <Form.Item>
    <ReCAPTCHA
      sitekey="YOUR_SITE_KEY"
      onChange={onCaptchaChange}
    />
  </Form.Item>
  
  {/* Nút đăng ký chỉ được kích hoạt khi reCAPTCHA đã được xác thực */}
  <Button
    type="primary"
    onClick={onNext}
    disabled={!captchaVerified} // Disable nếu chưa xác thực reCAPTCHA
    className="w-full h-12 text-white bg-red-500 hover:bg-red-600"
  >
    Next
  </Button>
</Form>
