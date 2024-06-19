import React from 'react';

const ChangepasswordStu: React.FC = () => {
    return (
        <div className="flex h-screen">
            <main className="flex-1 p-6 overflow-auto">
                <h1 className="text-2xl font-bold">Thông tin cá nhân</h1>
                <p className="text-gray-600">Quản lý thông tin cá nhân của bạn.</p>
                <div className="mt-4">
                    <section className="mb-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Thông tin cơ bản</h2>
                            <p className="text-gray-600">Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</p>
                        </div>
                        <div className="space-y-4">
                            <InfoItem label="Họ và tên" value="Nhu Ngoc (K17 HCM) Le" />
                            <InfoItem label="Tên người dùng" value="lenhungock17hcm" />
                            <InfoItem label="Giới thiệu" value="Chưa cập nhật" />
                            <InfoItem label="Ảnh đại diện" value={<img className="h-16 w-16 rounded-full" src="https://files.fullstack.edu.vn/f8-prod/user_photos/379503/65826d8841a16.jpg" alt="avatar" />} />
                        </div>
                    </section>
                    <section>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Thông tin mạng xã hội</h2>
                            <p className="text-gray-600">Quản lý liên kết tới các trang mạng xã hội của bạn.</p>
                        </div>
                        <div className="space-y-4">
                            <InfoItem label="Trang web cá nhân" value="Chưa cập nhật" />
                            <InfoItem label="GitHub" value="Chưa cập nhật" />
                            <InfoItem label="LinkedIn" value="Chưa cập nhật" />
                            <InfoItem label="Facebook" value="Chưa cập nhật" />
                            <InfoItem label="YouTube" value="Chưa cập nhật" />
                            <InfoItem label="TikTok" value="Chưa cập nhật" />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

type InfoItemProps = {
    label: string;
    value: React.ReactNode;
};

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
    return (
        <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
                <h4 className="text-lg font-medium">{label}</h4>
                <span className="text-gray-800">{value}</span>
            </div>
            <button className="text-gray-500">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" className="h-5 w-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path fill="currentColor" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
                </svg>
            </button>
        </div>
    );
}


export default ChangepasswordStu;
