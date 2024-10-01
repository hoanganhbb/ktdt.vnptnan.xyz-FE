import React, { useState } from 'react';
import { LoginDestopWrapper } from './styled';
import { Button, Input, Typography, ConfigProvider, Divider } from 'antd';
import requestAPI from '../../utils/requestAPI';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useAuth } from '../../hooks/useAuth';
import { isMobile } from 'react-device-detect';
import { toast } from 'sonner';

export default function LoginPage() {
  const [, setAccessToken] = useLocalStorage('access_token', null);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    setLoading(true);
    requestAPI
      .post(
        'api/token/',
        {
          username,
          password
        },
        {
          headers: {
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
          }
        }
      )
      .then(res => {
        setAccessToken(res.data.access);
        login({
          username
        });
        // requestAPI
        //   .get('users/me', {
        //     headers: {
        //       Authorization: `Bearer ${res.data.access}`
        //     }
        //   })
        //   .then(response => {
        //     login(response.data.user);
        //   })
        //   .finally(() => setLoading(false));
      })
      .catch(e => toast.error(JSON.stringify(e)))
      .finally(() => setLoading(false));
  };

  return (
    <LoginDestopWrapper>
      <div className="center-block">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                controlHeight: 44,
                fontSize: 15,
                borderRadius: 16
              },
              Input: {
                controlHeight: 48,
                fontSize: 16,
                borderRadius: 16,
                controlBorderWidth: 0,
                lineType: 'none',
                colorBorder: 'transaprent',
                colorBgContainer: '#F5F5F5'
              }
            }
          }}
        >
          <div style={{ width: '60%', display: isMobile && 'none' }}>
            <Typography.Title level={2} style={{ textAlign: 'left', margin: 0, marginBottom: 6, color: '#1759b5' }}>
              VNPT Nghệ An
            </Typography.Title>
            <Typography.Title level={2} style={{ textAlign: 'left', margin: 0, marginBottom: 6, color: '#263238' }}>
              Hệ thống quản trị thông minh
            </Typography.Title>
            <Typography.Title level={5} style={{ textAlign: 'left', margin: 0, marginBottom: 30, color: '#263238' }}>
              Phòng Kỹ thuật Đầu tư
            </Typography.Title>
          </div>
          <div style={{ width: isMobile ? '100%' : '30%' }}>
            <Typography.Title level={4} style={{ textAlign: 'left', margin: 0, marginBottom: 30, color: '#1759b5' }}>
              Xin chào!
            </Typography.Title>
            <Input
              placeholder="Nhập tài khoản"
              style={{ marginBottom: 16 }}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input.Password
              placeholder="Nhập mật khẩu"
              style={{ marginBottom: 30 }}
              value={password}
              onPressEnter={() => handleSubmit()}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="primary"
              block
              style={{ boxShadow: '0px 1px 10px 3px rgba(10, 100, 164, 0.6)' }}
              loading={loading}
              onClick={() => {
                handleSubmit();
              }}
            >
              ĐĂNG NHẬP
            </Button>
            <Divider>
              <Typography.Paragraph type="secondary" style={{ textAlign: 'center', margin: 0 }}>
                Đăng nhập tài khoản OneBSS
              </Typography.Paragraph>
            </Divider>
          </div>
        </ConfigProvider>
      </div >
    </LoginDestopWrapper >
  );

  // if (isMobile)
  //   return (
  //     <LoginWrapper>
  //       <ConfigProvider
  //         theme={{
  //           components: {
  //             Button: {
  //               controlHeight: 44,
  //               fontSize: 15,
  //               borderRadius: 16
  //             },
  //             Input: {
  //               controlHeight: 48,
  //               fontSize: 16,
  //               borderRadius: 16,
  //               controlBorderWidth: 0,
  //               lineType: 'none',
  //               colorBorder: 'transaprent',
  //               colorBgContainer: '#F5F5F5'
  //             }
  //           }
  //         }}
  //       >
  //         <div style={{ width: '100%' }}>
  //           <Typography.Title level={4} style={{ textAlign: 'left', margin: 0, marginBottom: 30, color: '#1759b5' }}>
  //             Hệ thống thi trực tuyến
  //           </Typography.Title>
  //           <Input placeholder="Nhập tài khoản" style={{ marginBottom: 16 }} />
  //           <Input.Password placeholder="Nhập mật khẩu" style={{ marginBottom: 30 }} />
  //           <Button
  //             type="primary"
  //             block
  //             style={{ boxShadow: '0px 1px 10px 3px rgba(10, 100, 164, 0.6)' }}
  //             loading={loading}
  //             onClick={() => {
  //               handleSubmit();
  //             }}
  //           >
  //             ĐĂNG NHẬP
  //           </Button>
  //           <Divider>
  //             <Typography.Paragraph type="secondary" style={{ textAlign: 'center', margin: 0 }}>
  //               Đăng nhập tài khoản OneBSS
  //             </Typography.Paragraph>
  //           </Divider>
  //         </div>
  //       </ConfigProvider>
  //     </LoginWrapper>
  //   );
}
