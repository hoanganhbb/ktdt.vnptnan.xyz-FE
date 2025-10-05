/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import requestAPI from '../../utils/requestAPI';
// import PropTypes from 'prop-types'
import MainLayout from '../../components/MainLayout/index';
import { selectorDuAnCapHuyenChuaKy, selectorDuAnCapHuyenChuaKyTheoDonViTrucThuoc } from '../../utils';
import { toast } from 'sonner';
import { colors } from '../../utils/theme';
import { Button, Col, Flex, Input, Row, Table } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FaCircleCheck } from 'react-icons/fa6';
dayjs.extend(weekOfYear);

const CURRENT_WEEK = dayjs().week();



// function BaoCaoCNTTDiaBan() {
//   const DANH_MUC = useRef();
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [dataTongHop, setDataTongHop] = useState([]);
//   const [user] = useLocalStorage('user');
//   const [duanSeleted, setDuanSeleted] = useState(null);

//   const fetchData = () => {
//     setIsLoading(true);
//     Promise.all([requestAPI.get(`api/profile/`), requestAPI.get('api/duancntt/')])
//       .then(response => {
//         DANH_MUC.current = response[0].data;
//         setData(selectorDuAnCapHuyenChuaKyTheoDonViTrucThuoc(response[1].data, response[0].data?.me?.don_vi));
//         setDataTongHop(selectorDuAnCapHuyenChuaKy(response[1].data));
//         // console.log(response[1].data.filter(ele => ele.id === 6));
//         // setData(response[1].data);
//       })
//       .catch(e => toast.error(e))
//       .finally(() => setIsLoading(false));
//   };

//   const handleUpdateContent = (value, duanIndex, tiendoIndex) => {
//     const tempData = [...data];
//     tempData[duanIndex].tien_do_du_an[tiendoIndex].noi_dung = value;
//     setData(tempData);
//   };

//   const handleSumitBaoCao = (duanIndex, tiendoIndex, id) => {
//     const body = data[duanIndex].tien_do_du_an[tiendoIndex];
//     requestAPI.patch(`/api/duancntt/tiendo/${id}`, body).then(res => {
//       toast.success('Cập nhật báo cáo thành công');
//       fetchData();
//     });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <MainLayout>
//       <Flex justify="space-between" align="center">
//         <div>
//           <div style={{ fontWeight: 600, fontSize: 18, color: colors.blue[800] }}>
//             Hệ thống báo cáo dự án CNTT triển khai {DANH_MUC.current?.me?.don_vi_display}
//           </div>
//           <div style={{ fontWeight: 400, color: colors.red[800], fontStyle: 'italic', margin: '4px 0' }}>
//             Lãnh đạo đơn vị thực hiện báo cáo tóm tắt nội dung thực hiện. Các HĐ đã ký kết trong tháng.
//           </div>
//         </div>
//         <Flex type="primary" style={{ fontWeight: 600, fontSize: 20 }}>
//           Tuần: {CURRENT_WEEK} |{dayjs().format('DD/MM/YYYY')}
//         </Flex>
//       </Flex>

//       <div style={{ height: 1, background: colors.blackAlpha[200], margin: '8px 0' }}></div>
//       <Row gutter={[16, 16]}>
//         {data.map((ele, index) => (
//           <>
//             <Col className="gutter-row" span={24} key={ele.id}>
//               <div
//                 style={{
//                   background: colors.white,
//                   borderRadius: 16,
//                   padding: 10,
//                   color: colors.blue[800],
//                   boxShadow: 'rgba(100, 70, 111, 0.2) 0px 7px 29px 0px'
//                 }}
//               >
//                 <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>{ele.ten_du_an}</div>
//                 <div style={{ fontWeight: 500, marginBottom: 8 }}>Chủ đầu tư: {ele.chu_dau_tu}</div>
//                 <div style={{ height: 1, background: colors.blackAlpha[200], margin: '6px 0' }}></div>
//                 {ele.tien_do_du_an.map((tiendo, idx) => (
//                   <div key={tiendo.id} style={{ display: idx === 0 ? 'block' : 'none' }}>
//                     <ReactQuill
//                       theme="snow"
//                       value={tiendo.noi_dung}
//                       onChange={e => handleUpdateContent(e, index, idx)}
//                     />
//                     <div style={{ height: 1, margin: '6px 0', color: '#eee' }}>{ele.id}</div>
//                     <Flex justify="flex-end">
//                       <Button type="primary" onClick={() => handleSumitBaoCao(index, idx, tiendo.id)}>
//                         Gửi báo cáo
//                       </Button>
//                     </Flex>
//                   </div>
//                 ))}
//               </div>
//             </Col>
//             <Col span={24}>
//               {/* style={{ background: colors.white, borderRadius: 10, padding: 10 }} */}
//               <div>
//                 <div style={{ fontWeight: 600, marginBottom: 4 }}>Báo cáo đã thực hiện: </div>
//                 <Table
//                   dataSource={ele.tien_do_du_an.slice(1, ele.tien_do_du_an.length)}
//                   size="small"
//                   pagination={false}
//                   columns={[
//                     {
//                       title: 'STT',
//                       dataIndex: 'name',
//                       key: 'name',
//                       render: (text, row, idx) => <>{idx + 1}</>,
//                       width: 60,
//                       align: 'center'
//                     },

//                     {
//                       title: 'Ngày báo cáo',
//                       dataIndex: 'ngay_cap_nhat',
//                       key: 'ngay_cap_nhat',
//                       render: (text, row) => <div style={{ fontWeight: 500 }}>{text}</div>
//                     },
//                     {
//                       title: 'Nội dung',
//                       dataIndex: 'noi_dung',
//                       key: 'noi_dung',
//                       render: (text, row) => (
//                         <div style={{ fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: row.noi_dung }} />
//                       )
//                     }
//                   ]}
//                 ></Table>
//                 {/* {ele.tien_do_du_an.map((tiendo, idx) => (
//                   <Flex key={idx} gap={16}>
//                     <div style={{ color: colors.blue[800], fontWeight: 600 }}>{tiendo.ngay_cap_nhat}</div>
//                     <div dangerouslySetInnerHTML={{ __html: tiendo.noi_dung }} />
//                   </Flex>
//                 ))} */}
//               </div>
//             </Col>
//           </>
//         ))}
//       </Row>

//       {['nttung.nan', 'phanducanh.nan', 'tonnhat.vtna', 'tulc.nan', 'phuongnt1.nan'].includes(user.username) &&
//         DANH_MUC.current && (
//           <div>
//             <div style={{ fontWeight: 600, fontSize: 18, color: colors.blue[800], margin: '10px 0' }}>
//               TỔNG HỢP BÁO CÁO
//             </div>
//             <Row gutter={16}>
//               <Col className="col-gutter" span={16}>
//                 <Table
//                   dataSource={[
//                     ...DANH_MUC.current.me.don_vi_truc_thuoc.filter(
//                       ele => ele.id !== 3 && ele.id !== 22 && ele.id !== 23
//                     )
//                   ]}
//                   pagination={false}
//                   size="small"

//                   columns={[
//                     {
//                       title: 'STT',
//                       dataIndex: 'name',
//                       key: 'name',
//                       render: (text, row, idx) => <>{idx + 1}</>,
//                       width: 60,
//                       align: 'center'
//                     },
//                     {
//                       title: 'Đơn vị',
//                       dataIndex: 'name',
//                       key: 'name',
//                       width: 300,
//                       render: (text, row) => <div style={{ fontWeight: 500 }}>{text}</div>
//                     },
//                     {
//                       title: 'Thực hiện báo cáo tuần',
//                       dataIndex: 'id',
//                       key: 'id',
//                       width: 180,
//                       align: 'center',
//                       render: (value, row) => {
//                         const noi_dung = dataTongHop.find(ele => ele.don_vi_truc_thuoc == value)?.tien_do_du_an[0]
//                           .noi_dung;
//                         if (!noi_dung || noi_dung == null) return '';
//                         else return <FaCircleCheck color={colors.green[600]} />;
//                       }
//                     },
//                     {
//                       title: 'Dự án',
//                       dataIndex: 'id',
//                       key: 'id',
//                       render: (value, row) => (
//                         <div style={{ fontWeight: 500, color: colors.blue[800], cursor: 'pointer' }}>
//                           {dataTongHop
//                             .filter(ele => ele.don_vi_truc_thuoc === value)
//                             .map(element => (
//                               <div key={element.id} onClick={() => setDuanSeleted(element)}>
//                                 &#x2022; {element.ten_du_an}
//                               </div>
//                             ))}
//                         </div>
//                       )
//                     }
//                   ]}
//                 ></Table>
//               </Col>
//               {duanSeleted && (
//                 <Col className="col-gutter" span={8}>
//                   <div style={{ background: colors.white, borderRadius: 10, padding: 16, height: '100%' }}>
//                     <Flex justify="center" style={{ fontWeight: 600, marginBottom: 10 }}>
//                       Tiến độ thực hiện ({duanSeleted.tien_do_du_an[0].ngay_cap_nhat})
//                     </Flex>
//                     <div style={{ height: 1, background: colors.gray[200] }}></div>
//                     <div
//                       style={{
//                         fontWeight: 500,
//                         marginBottom: 10
//                       }}
//                     >
//                       <div dangerouslySetInnerHTML={{ __html: duanSeleted.tien_do_du_an[0].noi_dung }} />
//                     </div>
//                   </div>
//                 </Col>
//               )}
//             </Row>
//           </div>
//         )}
//     </MainLayout>
//   );
// }

// BaoCaoCNTTDiaBan.propTypes = {}

// export default BaoCaoCNTTDiaBan;
