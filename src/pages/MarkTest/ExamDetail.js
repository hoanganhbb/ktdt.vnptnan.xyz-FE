import React, { useEffect, useState } from 'react';
import { Divider, Image, Space, Spin, Switch, Table, Typography } from 'antd';
import requestAPI from '../../utils/requestAPI';
import { useParams } from 'react-router-dom';
import { TYPE_EXAM_THUC_HANH } from '../../utils/constant';

function ExamDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [listCauHoi, setListCauHoi] = useState(null);
  // const [selectedCauHoi, setSelectedCauHoi] = useState(null);
  const [listDapAn, setListDapAn] = useState([]);

  const getDapAn = () => {
    requestAPI
      .get(`/api/thinangluc/cautraloi`)
      .then(res => {
        setListDapAn(res?.data);
      })
      .finally(() => setLoading(false));
  };
  const fetchData = (isLoading = false) => {
    if (isLoading) setLoading(true);
    requestAPI
      .get(`api/thinangluc/yeucauthuchanh?bai_thi_id=${id}`)
      .then(res => {
        // const arr = _(res?.data)
        //   .groupBy('cau_hoi_thuc_hanh.nhom_noi_dung.ten_noi_dung')
        //   .map(group => ({
        //     name: group[0].cau_hoi_thuc_hanh.nhom_noi_dung,
        //     answers: _.map(group, o => _.omit(o, 'category'))
        //   }))
        //   .value()
        //   .sort((a, b) => a.name.id - b.name.id);
        setListCauHoi(res?.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    getDapAn();
  }, []);

  return (
    <div style={{ padding: '0 0px' }}>
      <Spin tip="Đang xử lý..." spinning={loading}>
        <Divider orientation="center">
          <Typography.Title level={4} style={{ margin: 0 }} strong>
            BÀI THI
          </Typography.Title>
        </Divider>
        <Table
          rowKey="id"
          dataSource={listCauHoi}
          columns={[
            {
              title: 'STT',
              dataIndex: 'id',
              key: 'id',
              align: 'center',
              width: 60,
              render: text => <span>{text}</span>
            },
            {
              title: 'Nhóm câu hỏi',
              dataIndex: 'cau_hoi_thuc_hanh',
              key: 'cau_hoi_thuc_hanh',
              render: (text, row) => (
                <div>
                  <div>{text?.nhom_noi_dung?.ten_noi_dung}</div>
                  <div>
                    {row.cau_hoi_thuc_hanh.loai_cau_hoi} | {row.cau_hoi_thuc_hanh.nhom_dich_vu}
                  </div>
                  <Typography.Text strong style={{ margin: 0 }}>
                    Câu hỏi: {row.cau_hoi_thuc_hanh.noi_dung}
                  </Typography.Text>
                </div>
              )
            },
            {
              title: 'Đáp án',
              dataIndex: 'cau_hoi_thuc_hanh',
              key: 'cau_hoi_thuc_hanh',
              width: '30%',
              render: (text, row) => (
                <span>
                  {text.loai_cau_hoi === TYPE_EXAM_THUC_HANH ? (
                    <Space>
                      {row.photoyeucaubaithi.map(ele => (
                        <Image width={60} key={ele.id} src={ele.url} height={60} />
                      ))}
                    </Space>
                  ) : (
                    listDapAn.find(ele => ele?.cau_hoi === text?.id)?.noi_dung
                  )}
                </span>
              )
            },
            {
              title: 'Người đánh giá',
              dataIndex: 'nguoi_danh_gia',
              key: 'nguoi_danh_gia',
              width: 130,
              render: text => <span>{text}</span>
            },

            {
              title: 'Đánh giá',
              align: 'center',
              dataIndex: 'danh_gia',
              key: 'danh_gia',
              width: 220,
              render: text => (
                <a>
                  <>KHÔNG ĐẠT</> <Switch checked={text} /> <>ĐẠT</>
                </a>
              )
            }
          ]}
        ></Table>
      </Spin>
    </div>
  );
}

export default ExamDetail;
