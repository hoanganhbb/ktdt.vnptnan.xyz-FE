import { useState } from 'react';
import { Modal, Form, Input, message, Flex } from 'antd';
import { LockOutlined, LogoutOutlined, KeyOutlined } from '@ant-design/icons';
import requestAPI from '../../utils/requestAPI';

export default function UserDropdown({ user, onLogout, profiles }) {
  const [open, setOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    try {
      const values = await form.validateFields();
      if (values.newPassword !== values.confirmPassword) {
        message.error('Mật khẩu xác nhận không khớp!');
        return;
      }
      setLoading(true);
      await requestAPI.post('api/change-password/', {
        old_password: values.oldPassword,
        new_password: values.newPassword
      });
      message.success('Đổi mật khẩu thành công!');
      setChangePasswordOpen(false);
      form.resetFields();
    } catch {
      message.error('Đổi mật khẩu thất bại!');
    } finally {
      setLoading(false);
    }
  };

  // Get initials for avatar
  const initials = user?.name
    ? user.name
        .split(' ')
        .map(w => w[0])
        .slice(-2)
        .join('')
        .toUpperCase()
    : '?';

  return (
    <>
      <div className="relative flex ml-3 px-2">
        <button onClick={() => setOpen(!open)} className={'items-center focus:outline-none cursor-pointer'}>
          <Flex align="center" gap={2}>
            <div
              className={[
                'flex items-center h-9 w-9',
                'justify-center rounded-full',
                'bg-gray-100 text-sm font-semibold',
                'text-[#0c356a] transition-all',
                'hover:ring-2 hover:ring-[#0c356a]/20',
                'focus:outline-none'
              ].join(' ')}
            >
              {initials}
            </div>
            <div className="ml-2 md:hidden lg:flex lg:flex-col lg:justify-center">
              <p className="truncate text-sm font-semibold">{user?.name}</p>
              <p className="truncate text-xs text-gray-500 text-left">{profiles?.rolegroup[0]}</p>
            </div>
          </Flex>
        </button>

        {open && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

            {/* Dropdown */}
            <div
              className={[
                'absolute',
                'right-0',
                'top-full',
                'z-50',
                'mt-3',
                'w-64',
                'origin-top-right',
                'animate-in',
                'fade-in',
                'slide-in-from-top-1',
                'rounded-xl',
                'border',
                'border-gray-200',
                'bg-white',
                'p-1',
                'shadow-lg'
              ].join(' ')}
            >
              {/* User info */}
              <div className="flex items-center gap-3 rounded-lg px-3 py-3">
                <div
                  className={[
                    'flex h-10 w-10 shrink-0 items-center justify-center',
                    'rounded-full bg-[#0c356a] text-sm font-semibold text-white'
                  ].join(' ')}
                >
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="truncate text-xs text-gray-500">{user?.username}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-2 my-1 h-px bg-gray-100" />

              {/* Menu items */}
              <button
                onClick={() => {
                  setOpen(false);
                  setChangePasswordOpen(true);
                }}
                className={[
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2',
                  'text-sm text-gray-700 transition-colors',
                  'hover:bg-gray-50 active:bg-gray-100',
                  'cursor-pointer'
                ].join(' ')}
              >
                <KeyOutlined className="text-gray-400" />
                <span>Đổi mật khẩu</span>
              </button>

              {/* Divider */}
              <div className="mx-2 my-1 h-px bg-gray-100" />

              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className={[
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2',
                  'text-sm text-red-600 transition-colors',
                  'hover:bg-red-50 active:bg-red-100',
                  'cursor-pointer'
                ].join(' ')}
              >
                <LogoutOutlined />
                <span>Đăng xuất</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Change Password Modal */}
      <Modal
        title="Đổi mật khẩu"
        open={changePasswordOpen}
        onOk={handleChangePassword}
        onCancel={() => {
          setChangePasswordOpen(false);
          form.resetFields();
        }}
        confirmLoading={loading}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="oldPassword"
            label="Mật khẩu hiện tại"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
            ]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                }
              })
            ]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
