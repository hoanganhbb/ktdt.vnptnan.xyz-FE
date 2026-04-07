/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, Flex, Spin } from 'antd';
import { IoReload } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'sonner';
import useAuthStore from '../../store/useAuthStore';

const USERS_CONFIG_PATH = '/config/eoffice-users.json';

function LoadCongViec({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [valueOTP, setValueOTP] = useState('');
  const [isShowInputOTP, setIsShowInputOTP] = useState(false);
  const [OTPInfo, setOTPInfo] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      setIsLoadingUsers(true);
      try {
        // Load config from public folder so credentials can be updated without touching source code.
        const result = await axios.get(USERS_CONFIG_PATH);
        if (isMounted) {
          setListUsers(Array.isArray(result.data) ? result.data : []);
        }
      } catch (error) {
        if (isMounted) {
          setListUsers([]);
        }
        toast.error('Không đọc được cấu hình tài khoản eOffice');
      } finally {
        if (isMounted) {
          setIsLoadingUsers(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSendOTP = async () => {
    if (isLoadingUsers) return toast.info('Đang tải cấu hình tài khoản eOffice');
    const body = listUsers.find(ele => ele.username === user?.username);
    if (!body) return toast.error('Kiểm tra tài khoản đăng nhập');
    setIsShowModal(true);
    setIsLoading(true);
    try {
      const result = await axios.post('https://eoffice.vnpt.vn/qlvb/api/login/v6/', {
        username: body.username,
        password: body.password
      });
      console.log(result);
      if (result.status === 200) {
        setIsShowInputOTP(true);
        setOTPInfo(result.data);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Tài khoản đăng nhập không chính xác, vui lòng đăng nhập lại sau 5p');
    }
  };

  const handleConfirmOTP = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post('https://eoffice.vnpt.vn/qlvb/api/validatesmsotp/', {
        username: user.username,
        password: user.password,
        otp: valueOTP
      });
      if (result.status == '200') {
        toast.success(`Đăng nhập thành công với tài khoản ${result?.data?.data?.fullName}`);
        toast.success(result.data?.data?.token);
        setIsShowInputOTP(false);
        fetchData(result);
      }
    } catch (error) {
      toast.error('Tài khoản đăng nhập không chính xác, vui lòng đăng nhập lại sau 5p');
      setIsLoading(false);
    }
  };

  const fetchData = result => {
    setIsLoading(true);
    axios
      .post('https://api-node.ktdt.vnptnan.xyz/login-eoffice', {
        token_eoffice: result.data.data.token,
        username: user.username
        // token_eoffice: '$2a$10$InZ2RNdJmuKfSgZTI0zlv.UXTMKGcoq1ND4E3lMpfV36tH3mnAHja'
      })
      .then(res => {
        if (res.status == '200') {
          toast.success(`Đã hoàn thành thêm ${res.data.data.length} công việc`, {
            duration: 3000
          });
          onSuccess();
        }
      })
      .catch(() => toast.error('Có lỗi trong quá trình lấy dữ liệu'))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Button
        variant="filled"
        color="blue"
        onClick={() => {
          handleSendOTP();
        }}
        loading={isLoading}
        style={{ border: '1px solid var(--color-blue-500)' }}
        icon={<IoReload style={{ position: 'relative' }} />}
      >
        Load công việc
      </Button>
      <Modal
        open={isShowModal}
        title="Tải công việc từ eOffice"
        onOk={() => handleConfirmOTP()}
        okText="Tiếp tục"
        cancelText="Hủy"
        onCancel={() => {
          setIsShowInputOTP(false);
          setIsShowModal(false);
        }}
      >
        <Spin spinning={isLoading} tip="Đang tải dữ liệu">
          <div style={{ textAlign: 'center', minHeight: 100 }}>
            {isShowInputOTP && (
              <>
                <div style={{ marginBottom: 12 }}> OTP đã được gửi đến số điện thoại: {OTPInfo?.data?.mobile}</div>
                <Flex justify="center" align="center">
                  <Input.OTP
                    style={{ fontSize: 18, fontWeight: 600 }}
                    size="large"
                    value={valueOTP}
                    onChange={e => setValueOTP(e)}
                  ></Input.OTP>
                </Flex>
              </>
            )}
          </div>
        </Spin>
      </Modal>
    </>
  );
}

export default LoadCongViec;
