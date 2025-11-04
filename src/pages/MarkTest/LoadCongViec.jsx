/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Modal, Input, Button, Flex, Spin } from 'antd';
import { IoReload } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'sonner';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const LIST_USERS = [
  {
    id: 16,
    username: 'tonnhat.vtna',
    password: '789Abc1234@'
  },
  {
    id: 38,
    username: 'thuandn.nan',
    password: 'Thuan@123'
  }
];

function LoadCongViec({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [valueOTP, setValueOTP] = useState('');
  const [isShowInputOTP, setIsShowInputOTP] = useState(false);
  const [OTPInfo, setOTPInfo] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [user] = useLocalStorage('user');

  const handleSendOTP = async () => {
    const body = LIST_USERS.find(ele => ele.username === user?.username);
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
        username: user.username,
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
        type="primary"
        onClick={() => {
          handleSendOTP();
        }}
        loading={isLoading}
        icon={<IoReload style={{ position: 'relative'}}></IoReload>}
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
