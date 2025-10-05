import React from 'react';
import { Card, Avatar, Button, Flex } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <Flex vertical align="center" style={{ padding: '24px', minHeight: '100vh', background: '#f7f9fc' }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}
      >
        <Flex gap={8} style={{ textAlign: 'left', padding: '0 4px', marginBottom: 12 }} align="center">
          <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#26408c' }} />
          <div style={{ fontSize: 26, fontWeight: 700 }}>{user?.name}</div>
        </Flex>
        <Flex vertical gap={8} style={{ textAlign: 'left', padding: '0 4px' }}>
          <div>
            <MailOutlined style={{ marginRight: 8 }} /> {user.username}
          </div>
        </Flex>

        <Button
          type="primary"
          block
          size="large"
          style={{ marginTop: 24, background: '#26408c', borderColor: '#26408c' }}
          onClick={() => logout()}
        >
          Đăng xuất
        </Button>
      </Card>
    </Flex>
  );
}
