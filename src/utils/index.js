import dayjs from 'dayjs';
import { formatCash } from './constant';

const DU_AN_CAP_TINH_ID = 9;
const DU_AN_CAP_HUYEN_ID = 10;
const TRANG_THAI_HD_HET_HAN = 102;
const TRANG_THAI_HD_CHUA_KY = 5;
const TRANG_THAI_HD_DA_KY = 6;

export const selectorDuAnCapTinhConHieuLuc = data => {
  return data
    .filter(ele => ele.trang_thai_hop_dong !== TRANG_THAI_HD_HET_HAN)
    .sort((a, b) => dayjs(b.ngay_hop_dong).diff(dayjs(a.ngay_hop_dong), 'day'));
};

export const selectorDuAnCapHuyenConHieuLuc = data => {
  return data.filter(ele => ele.cap_du_an === DU_AN_CAP_HUYEN_ID && ele.trang_thai_hop_dong === TRANG_THAI_HD_DA_KY);
};

export const selectorDuAnCapHuyenChuaKyTheoDonVi = (data, don_vi) => {
  return data
    .filter(ele => ele.cap_du_an === DU_AN_CAP_HUYEN_ID && ele.trang_thai_hop_dong === TRANG_THAI_HD_CHUA_KY)
    .filter(ele => ele.don_vi_ky_ket_display.includes(don_vi))
    .sort((a, b) => dayjs(b.ngay_hop_dong).diff(dayjs(a.ngay_hop_dong), 'day'));
};

export const selectorDuAnCapHuyenChuaKy = data => {
  return data
    .filter(ele => ele.cap_du_an === DU_AN_CAP_HUYEN_ID && ele.trang_thai_hop_dong === TRANG_THAI_HD_CHUA_KY)
    .sort((a, b) => dayjs(b.ngay_hop_dong).diff(dayjs(a.ngay_hop_dong), 'day'));
};

export const calculateSumIncomeCapTinh = (data, year) => {
  const dataFine = data
    .filter(
      ele =>
        ele.cap_du_an === DU_AN_CAP_TINH_ID &&
        ele.trang_thai_hop_dong === TRANG_THAI_HD_DA_KY &&
        ele.trang_thai_hop_dong !== TRANG_THAI_HD_HET_HAN
    )
    .filter(ele => ele.doanh_thu_du_kien.length);

  const dataIncomeOfYear = dataFine
    .map(element => {
      return element.doanh_thu_du_kien.find(ele => ele.nam == year);
    })
    .filter(ele => ele);

  const totalSum = dataIncomeOfYear.reduce((acc, currentValue) => acc + currentValue.gia_tri, 0);

  return formatCash(totalSum, true);
};

export const calculateSumIncomeCapHuyen = (data, year) => {
  const dataFine = data
    .filter(
      ele =>
        ele.cap_du_an === DU_AN_CAP_HUYEN_ID &&
        ele.trang_thai_hop_dong === TRANG_THAI_HD_DA_KY &&
        ele.trang_thai_hop_dong !== TRANG_THAI_HD_HET_HAN
    )
    .filter(ele => ele.doanh_thu_du_kien.length);

  const dataIncomeOfYear = dataFine
    .map(element => {
      return element.doanh_thu_du_kien.find(ele => ele.nam == year);
    })
    .filter(ele => ele);

  const totalSum = dataIncomeOfYear.reduce((acc, currentValue) => acc + currentValue.gia_tri, 0);

  return formatCash(totalSum, true);
};

export const selectorDuAnCapHuyenChuaKyTheoDonViTrucThuoc = (data, don_vi) => {
  return data
    .filter(ele => ele.cap_du_an === DU_AN_CAP_HUYEN_ID && ele.trang_thai_hop_dong === TRANG_THAI_HD_CHUA_KY)
    .filter(ele => ele.don_vi_truc_thuoc == don_vi)
    .sort((a, b) => dayjs(b.ngay_hop_dong).diff(dayjs(a.ngay_hop_dong), 'day'));
};

export { TRANG_THAI_HD_HET_HAN, TRANG_THAI_HD_DA_KY, DU_AN_CAP_HUYEN_ID, DU_AN_CAP_TINH_ID, TRANG_THAI_HD_CHUA_KY };

export const steps = [
  { value: 1, name: 'Tiếp cận, giới thiệu SPDV' },
  { value: 2, name: 'Xây dựng hệ thống thử nghiệm (PoC)' },
  { value: 3, name: 'CĐT lập BCĐXCT' },
  { value: 4, name: 'CĐT thẩm định BCĐXCT' },
  { value: 5, name: 'CĐT phê duyệt BCĐXCT' },
  { value: 6, name: 'CĐT lập BCKTKT' },
  { value: 7, name: 'CĐT thẩm định KH thuê' },
  { value: 8, name: 'CĐT phê duyệt KH thuê' },
  { value: 9, name: 'CĐT lập và phê duyệt KHLCNT' },
  { value: 10, name: 'CĐT lập và thẩm định HSMT' },
  { value: 11, name: 'CĐT đăng tải thông báo mời thầu' },
  { value: 12, name: 'Xây dựng HSDT' },
  { value: 13, name: 'Nộp thầu' },
  { value: 14, name: 'Làm rõ HSDT' },
  { value: 15, name: 'Kết quả LCNT' },
  { value: 16, name: 'Cập nhật thông tin trượt/trúng thầu' },
  { value: 17, name: 'Thương thảo hợp đồng' },
  { value: 18, name: 'Ký hợp đồng' },
  { value: 19, name: 'Triển khai dịch vụ' }
];
