import React, { useState } from 'react';
import { LoginDestopWrapper } from './styled';
import { Button, Input, ConfigProvider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import requestAPI from '../../utils/requestAPI';
import useAuthStore from '../../store/useAuthStore';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';

const FEATURES = [
  'Quản lý dự án CNTT hiệu quả',
  'Theo dõi tiến độ công việc theo thời gian thực',
  'Báo cáo chi tiết và phân tích dữ liệu'
];

export default function LoginPage() {
  const setAccessToken = useAuthStore(state => state.setAccessToken);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!username || !password) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);

    const body = {
      username,
      password
    };

    const options = {
      headers: {
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      }
    };

    try {
      const tokenRes = await requestAPI.post('api/token/', body, options);
      const accessToken = tokenRes?.data?.access;
      if (!accessToken) throw new Error('Thông tin đăng nhập không hợp lệ');

      setAccessToken(accessToken);

      const profileRes = await requestAPI('/api/profile/');

      const profileData = profileRes?.data;
      const userInfo = profileData?.users?.find(user => user.username === username);

      if (!userInfo) throw new Error('Không tìm thấy thông tin người dùng');

      login({ username, ...userInfo });
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      toast.error(err?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginDestopWrapper>
      <div className="center-block">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                controlHeight: 48,
                fontSize: 16,
                borderRadius: 8,
                colorPrimary: '#0c356a',
                colorPrimaryHover: '#36469c',
                colorPrimaryActive: '#4857b8'
              },
              Input: {
                controlHeight: 48,
                fontSize: 16,
                borderRadius: 8,
                colorBorder: '#e5e7eb',
                colorBgContainer: '#ffffff',
                colorTextPlaceholder: '#9ca3af',
                controlOutlineWidth: 0
              }
            }
          }}
        >
          {/* Left Section - Desktop Only */}
          <div className="login-section">
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-4 text-white leading-tight">VNPT Nghệ An</h1>
              <p className="text-2xl font-semibold mb-3 text-white opacity-95">Hệ thống quản trị thông minh</p>
              <p className="text-base text-white opacity-85 font-medium">Phòng Kỹ thuật Đầu tư</p>
            </div>

            <div className="space-y-6 text-white opacity-80 leading-relaxed text-base">
              {FEATURES.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <p className="m-0">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="form-section">
            <div className="bg-white rounded-2xl shadow-2xl border border-white/20 p-10 backdrop-blur-lg">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Xin chào</h2>
                <p className="text-sm text-gray-500 m-0">Đăng nhập vào hệ thống quản trị</p>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tài khoản</label>
                <Input
                  placeholder="Nhập tài khoản"
                  prefix={<UserOutlined className="text-gray-300 text-base mr-2" />}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onPressEnter={handleSubmit}
                  className="transition-all duration-300"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  prefix={<LockOutlined className="text-gray-300 text-base mr-2" />}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onPressEnter={handleSubmit}
                  className="transition-all duration-300"
                />
              </div>

              <Button
                type="primary"
                block
                loading={loading}
                onClick={handleSubmit}
                className="font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                ĐĂNG NHẬP
              </Button>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p className="m-0">Hệ thống quản lý dự án OneBSS</p>
              </div>
            </div>
          </div>
        </ConfigProvider>
      </div>
    </LoginDestopWrapper>
  );
}
