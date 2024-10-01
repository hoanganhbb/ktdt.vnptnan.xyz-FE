/* eslint-disable react/no-unknown-property */

/* eslint-disable max-len */

import React, { useState, useEffect } from 'react';
import { getClassStatus, getNameCatByCodeCat, getNameStatus, getPriceCnttt } from '../../utils/commonFunction';
import client from '../../utils/requestHttp';
import moment from 'moment';
import { Globe } from 'react-feather';
import { Button, Col, DatePicker, Divider, Input, Radio, Row } from 'antd';

const catInvestFields = [
  { code: 'HH', name: 'Hàng hóa', nameEn: 'Goods', categoryTypeCode: 'DM_LVLCNT' },
  { code: 'XL', name: 'Xây lắp', nameEn: 'Construction', categoryTypeCode: 'DM_LVLCNT' },
  { code: 'PTV', name: 'Phi tư vấn', nameEn: 'Non-consulting services', categoryTypeCode: 'DM_LVLCNT' },
  { code: 'TV', name: 'Tư vấn', nameEn: 'Consulting services', categoryTypeCode: 'DM_LVLCNT' },
  { code: 'HON_HOP', name: 'Hỗn hợp', nameEn: 'Mixed package', categoryTypeCode: 'DM_LVLCNT' }
];

function HomePage() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await client.get('/bidding-acouncements');
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Row gutter={0}>
        <Col span={18}>
          <h5 style={{ color: '#0f4871', fontWeight: 600 }}>DANH SÁCH CÁC GÓI ĐANG MỜI THẦU</h5>
          <div className="content__body__left" id="search-home">
            {data.docs &&
              !!data.docs.length &&
              data.docs.map(item => (
                <div key={item.id} className="content__body__left__item" v-if="item.type =='es-notify-contractor'">
                  <div className="content__body__left__item__infor">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="content__body__left__item__infor__code">
                        Mã TBMT: {item?.notifyNo}-{item?.notifyVersion}
                      </p>
                      <span className={getClassStatus(item)}>{getNameStatus(item)}</span>
                    </div>
                    <div className="row">
                      <div className="col-md-8 content__body__left__item__infor__contract">
                        <a href="" alt="">
                          <h5 className="content__body__left__item__infor__contract__name format__text__title">
                            {item.isInternet === 1 && <Globe color="green" size="16" />}{' '}
                            {item.bidName && item.bidName?.length > 0 ? item.bidName[0] : ''}
                          </h5>
                        </a>
                        <div className="row">
                          <div className="col-md-8 content__body__left__item__infor__contract__other format__text">
                            {item.planType === 'DTPT' && (
                              <>
                                <h6 className="format__text">
                                  Bên mời thầu: <span>{item?.procuringEntityName}</span>
                                </h6>
                                <h6 className="format__text">
                                  Chủ đầu tư: <span>{item?.investorName}</span>
                                </h6>
                              </>
                            )}
                            {item.planType !== 'DTPT' && (
                              <>
                                <h6 className="format__text">
                                  Chủ đầu tư/ Bên mời thầu: <span>{item?.procuringEntityName}</span>
                                </h6>
                              </>
                            )}
                            <h6>
                              {!item?.caseKHKQ && item?.notifyVersion === '00' && (
                                <>
                                  Ngày đăng tải thông báo:{' '}
                                  <span>
                                    {moment(item?.publicDate, 'YYYY-MM-DD').format('DD/MM/YYYY')} -{' '}
                                    {moment(item?.publicDate).format('HH:mm')}
                                  </span>
                                </>
                              )}
                              {item?.caseKHKQ && (
                                <>
                                  Ngày đăng tải KQLCNT:
                                  <span>
                                    {item?.publicDateKqlcnt} - {item.publicDateKqlcnt}
                                  </span>
                                </>
                              )}
                              <template v-if="!item?.caseKHKQ &amp;&amp; item?.notifyVersion != '00'">
                                Thời gian sửa TBMT:
                                <span>
                                  {item?.publicDate} - {item.publicDate}
                                </span>
                              </template>
                            </h6>
                            <h6 className="format__text">
                              Giá trị gói thầu:{' '}
                              <span>
                                {item?.bidPrice[0].toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                              </span>
                            </h6>
                            {/* <h6 v-if="checkSearchKqlcnt()">
                      Ngày đăng tải KQLCNT:
                      <span>
                        {item?.publicDateKqlcnt} - {item.publicDate}
                      </span>
                    </h6>
                    <h6 v-if="checkSearchKqst()">
                      Ngày đăng tải KQST:
                      <span>
                        {item?.publicDateKqst} - {item.publicDateKqst}
                      </span>
                    </h6>
                    <h6 v-if="checkSearchKqmqt()">
                      Ngày đăng tải KQMQT:
                      <span>
                        {item?.publicDateKqst} - {item.publicDateKqst}
                      </span>
                    </h6> */}
                          </div>
                          <div className="col-md-4 content__body__left__item__infor__contract__other">
                            {item?.investField && (
                              <h6>
                                Lĩnh vực:{' '}
                                <span>
                                  {item?.investField[0]
                                    ? getNameCatByCodeCat(item?.investField[0], catInvestFields)
                                    : getNameCatByCodeCat(item?.investField[0], catInvestFields)}
                                </span>
                              </h6>
                            )}
                            <h6 className="format__text__title" v-if="item.locations">
                              Địa điểm: {item.locations?.length > 0 && <span>{item.locations[0].provName}</span>}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 content__body__right__item__infor__contract">
                        <div className="">
                          {item?.publicDate && (
                            <>
                              <p>Thời điểm đóng thầu</p>
                              <h5>{moment(item?.bidCloseDate, 'YYYY-MM-DDTHH:mm').format('HH:mm')}</h5>
                              <h5>{moment(item?.bidCloseDate, 'YYYY-MM-DD').format('DD/MM/YYYY')}</h5>
                            </>
                          )}
                          {/* <p>Hình thức dự thầu</p> */}
                          {/* <h5>{item.isInternet === 1 ? 'Qua mạng' : 'Không qua mạng'}</h5> */}
                        </div>
                      </div>
                      <div className="col-lg-2 content__body__right__item__infor__contract">
                        {item.statusForNotify != 'DHT' ||
                          (item.statusForNotify != 'DHTBMT' && (
                            <div className="p-0 content__body__right__item__infor__contract__right">
                              <p v-if="getTextCnttt(item)">Nhà thầu trúng thầu</p>
                              <h5
                                className="content__body__right__item__infor__contract__right__text"
                                v-if="getTextCnttt(item)"
                              ></h5>
                              <p>Giá trúng thầu (VND)</p>
                              {getPriceCnttt(item) && <h5> {getPriceCnttt(item) || '---'} </h5>}
                              <p v-if="item?.decisionDate">Ngày phê duyệt KQLCNT</p>
                              <h5 v-if="item?.decisionDate"> {item?.decisionDate}</h5>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Col>
        <Col
          span={12}
          style={{
            boxShadow: '0 3px 3px 5px #90909920',
            borderRadius: 8,
            padding: 10,
            position: 'fixed',
            width: 400,
            background: 'white',
            right: 20
          }}
        >
          <h5 style={{ color: '#0f4871', fontWeight: 600, textAlign: 'center' }}>BỘ LỌC TÌM KIẾM</h5>
          <p style={{ color: '#0f4871', fontWeight: 600 }}>Từ khóa tìm kiếm: </p>
          <Input placeholder="Nhập từ khóa"></Input>
          <Divider></Divider>
          <p style={{ color: '#0f4871', fontWeight: 600 }}>Chọn lĩnh vực: </p>
          <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio value="HH">Hàng hóa</Radio>
            <Radio value="XD">Xây dựng</Radio>
            <Radio value="HH">Hỗn hợp</Radio>
            <Radio value="TV">Tư vấn</Radio>
            <Radio value="PTV">Phi tư vấn</Radio>
          </Radio.Group>
          <Divider></Divider>
          <p style={{ color: '#0f4871', fontWeight: 600 }}>Chọn thời điểm đóng thầu: </p>
          <DatePicker style={{ width: '100%' }} />
          <Divider></Divider>
          <p style={{ color: '#0f4871', fontWeight: 600 }}>Chọn địa điểm thực hiện gói thầu: </p>
          <Radio.Group defaultValue="a">
            <Radio value="HH">Toàn quốc</Radio>
            <Radio value="XD">Tỉnh/thành phố</Radio>
          </Radio.Group>
          {/* <Divider></Divider> */}
          <p></p>
          <Button type="primary" block>
            Tìm kiếm
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
