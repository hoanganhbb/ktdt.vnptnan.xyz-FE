import React, { useEffect, useState } from 'react';
import { Divider, Modal, Typography, Spin } from 'antd';
import UploadImage from '../../components/UploadImage/UploadImage';
import { CardWrapper, HomeWrapper, ViewImageWrapper } from './styled';
import { CheckSquare, Clock, Home, Info, Folder } from 'react-feather';
import Countdown, { zeroPad } from 'react-countdown';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate, useParams } from 'react-router-dom';
import requestAPI from '../../utils/requestAPI';
import ImageViewer from '../../components/ImageViewer';
import { toast } from 'sonner';
import { TYPE_EXAM_XU_LY, TYPE_EXAM_THUC_HANH } from '../../utils/constant';
import AnswerComponent from './AnswerComponent';
import _ from 'lodash';
import randomAnswer from '../../utils/randomAnswer';

export default function Examination() {
  const { id } = useParams();
  const [user] = useLocalStorage('user');
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listCauHoi, setListCauHoi] = useState(null);
  const [selectedCauHoi, setSelectedCauHoi] = useState(null);
  const [listDapAn, setListDapAn] = useState([]);
  const [openModalAnswer, setOpenModalAnswer] = useState(false);
  const [openModalViewImage, setOpenModalViewImage] = useState(false);

  const handleUploadFile = (file, id) => {
    const formData = new FormData();
    formData.append('photoyeucaubaithi', file);
    requestAPI
      .patch(`api/thinangluc/yeucauthuchanh/${id}`, formData, {
        headers: {
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      .then(res => {
        if (res.statusText === 'OK') toast.success('Cập nhật đáp án thành công');
        fetchData();
      })
      .finally(() => setLoading(false));
  };

  const handleSubmitXuLy = (questionID, answerID) => {
    const formData = new FormData();
    formData.append('lua_chon_dap_an', answerID);
    requestAPI
      .patch(`api/thinangluc/yeucauthuchanh/${questionID}`, formData, {
        headers: {
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      .then(res => {
        if (res.statusText === 'OK') toast.success('Cập nhật đáp án thành công');
        fetchData();
      })
      .finally(() => setLoading(false));
  };

  const fetchData = (isLoading = false) => {
    if (isLoading) setLoading(true);
    requestAPI
      .get(`api/thinangluc/yeucauthuchanh?bai_thi_id=${id}`)
      .then(res => {
        const arr = _(res?.data)
          .groupBy('cau_hoi_thuc_hanh.nhom_noi_dung.ten_noi_dung')
          .map(group => ({
            name: group[0].cau_hoi_thuc_hanh.nhom_noi_dung,
            answers: _.map(group, o => _.omit(o, 'category'))
          }))
          .value()
          .sort((a, b) => a.name.id - b.name.id);
        setListCauHoi(arr);
      })
      .finally(() => setLoading(false));
  };

  const getDapAn = () => {
    requestAPI
      .get(`/api/thinangluc/cautraloi`)
      .then(res => {
        setListDapAn(res?.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(true);
    getDapAn();
  }, []);

  const confirm = () => {
    modal.confirm({
      title: 'Xác nhận rời khỏi bài thi',
      icon: <Info color="#E53935" style={{ marginRight: 10 }} />,
      content: 'Hệ thống không ghi nhận điểm số khi bạn rời khỏi bài thi',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: () => {
        console.log('ok');
        navigate('/');
      }
    });
  };

  return (
    <Spin tip="Đang xử lý..." spinning={loading}>
      <HomeWrapper>
        {contextHolder}
        <Countdown
          date={Date.now() + 100000}
          intervalDelay={0}
          precision={3}
          renderer={props => (
            <div className="timecounter">
              <div className="flex-baseline-center">
                <Home size={20} style={{ paddingLeft: 10 }} onClick={confirm}></Home>
                <Typography.Title level={5} style={{ margin: 0, color: '#fff', paddingLeft: 6 }}>
                  <span style={{ fontWeight: 400 }}>Thí sinh:</span> {user.username}
                </Typography.Title>
              </div>
              <div className="flex-baseline-center" style={{ paddingRight: 10, fontWeight: 600 }}>
                <Clock size={18} style={{ marginRight: 6, fontWeight: 600 }}></Clock>
                {zeroPad(props.minutes)}:{zeroPad(props.seconds)}
              </div>
            </div>
          )}
          autoStart
        />
        {listCauHoi &&
          !!listCauHoi.length &&
          listCauHoi.map((loaiCauHoi, idx) => (
            <CardWrapper key={loaiCauHoi.name.id} size="small" title={loaiCauHoi.name.ten_noi_dung}>
              {listCauHoi &&
                listCauHoi[idx].answers.map(ele => (
                  <div key={ele.id}>
                    <div className="container">
                      <div className="flex-baseline-center">
                        <CheckSquare
                          size={20}
                          style={{
                            minWidth: 20,
                            marginRight: 10,
                            color: ele?.photoyeucaubaithi?.length ? 'green' : '#E0E0E0'
                          }}
                        ></CheckSquare>
                        <Typography.Paragraph
                          style={{
                            margin: 0,
                            marginRight: 10,
                            textAlign: 'justify',
                            fontWeight: ele?.photoyeucaubaithi?.length ? 500 : 400,
                            lineHeight: '16px'
                          }}
                        >
                          {ele?.cau_hoi_thuc_hanh?.noi_dung}
                        </Typography.Paragraph>
                      </div>
                      {ele?.cau_hoi_thuc_hanh.loai_cau_hoi === TYPE_EXAM_THUC_HANH && (
                        <div className="flex-baseline-center" style={{ justifyContent: 'space-between' }}>
                          <div>
                            <Typography.Text style={{ color: ele?.photoyeucaubaithi?.length ? 'green' : 'grey' }}>
                              {ele?.photoyeucaubaithi?.length ? 'Đã hoàn thành' : 'Chưa hoàn thành'} |{' '}
                              {ele?.photoyeucaubaithi?.length} ảnh
                            </Typography.Text>
                          </div>
                          <div className="flex-baseline-center">
                            <UploadImage id={ele.id} onUpload={file => handleUploadFile(file, ele.id)}></UploadImage>
                            {!!ele?.photoyeucaubaithi?.length && (
                              <ViewImageWrapper
                                onClick={() => {
                                  setSelectedCauHoi(ele);
                                  setOpenModalViewImage(true);
                                }}
                              >
                                <Folder size={20} color=" #0C356A"></Folder>
                              </ViewImageWrapper>
                            )}
                          </div>
                        </div>
                      )}
                      {ele?.cau_hoi_thuc_hanh.loai_cau_hoi === TYPE_EXAM_XU_LY && (
                        <div className="" style={{ justifyContent: 'space-between' }}>
                          <AnswerComponent
                            listDapAn={randomAnswer(listDapAn, ele?.cau_hoi_thuc_hanh.id)}
                            data={ele}
                            onSubmit={(questionID, answerID) => handleSubmitXuLy(questionID, answerID)}
                            onClose={() => {
                              setOpenModalAnswer(false);
                              setSelectedCauHoi(null);
                            }}
                          ></AnswerComponent>
                        </div>
                      )}
                    </div>
                    <Divider></Divider>
                  </div>
                ))}
            </CardWrapper>
          ))}

        {openModalViewImage && (
          <Modal
            title={selectedCauHoi?.cau_hoi_thuc_hanh?.noi_dung}
            onCancel={() => {
              setSelectedCauHoi(null);
              setOpenModalViewImage(false);
            }}
            open={selectedCauHoi}
            footer={null}
            style={{ top: 40 }}
          >
            <ImageViewer element={selectedCauHoi}></ImageViewer>
          </Modal>
        )}

        {openModalAnswer && (
          <Modal
            title={selectedCauHoi?.cau_hoi_thuc_hanh?.noi_dung}
            onCancel={() => {
              setOpenModalAnswer(false);
              setSelectedCauHoi(null);
            }}
            open={selectedCauHoi}
            footer={null}
            style={{ top: 40 }}
          ></Modal>
        )}
      </HomeWrapper>
    </Spin>
  );
}
