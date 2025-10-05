// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { Button } from 'antd';
import LoginPage from './pages/Login';
import ProtectedLayout from './components/ProtectLayout';
import Examination from './pages/Examination';
import NotFoundPage from './pages/NotFound';
import MarkTest from './pages/MarkTest';
import ExamDetail from './pages/MarkTest/ExamDetail';
import InfomationProjects from './pages/InfomationProjects';
import CongViecKTDT from './pages/CongViecKTDT';
// import MuaSamCongPage from './pages/MuaSamCong';
import FormDuAnCNTT from './pages/FormDuAnCNTT';
import FormTarget from './pages/FormTarget';
import FormCreateDuAn from './pages/FormCreateDuAn';
import DuAnCapHuyen from './pages/DuAnCapHuyen';
import DuAnHuyen from './pages/DuAnCapHuyen/DuAnHuyen';
import HomeLayout from './components/HomeLayout';
import HomePage from './pages/Home';
import ReportPage from './pages/Report';
import BaoCaoDoanhThuCNTTPage from './pages/BaoCaoDoanhThuCNTT';
import BaoCaoDoanhThuTongHop from './pages/BaoCaoDoanhThuCNTT/BaoCaoDoanhThuTongHop';
import BaoCaoDoanhThuHoachToan from './pages/BaoCaoDoanhThuCNTT/BaoCaoDoanhThuHoachToan';
import SettingsDoanhThu from './pages/SettingsDoanhThu';
import MobilePageHome from './pages/MobilePage';
import CheckinCalendarTime from './pages/MobilePage/CheckinCalendarTime';
import MobilePageLayout from './pages/MobilePage/Layout';
import ProfileScreen from './pages/MobilePage/ProfileScreen';

const ExternalRedirect = () => {
  window.location.href = 'https://vnptnghean.com.vn/report-it-services'; // Điều hướng đến trang web bên ngoài
  return null; // Trả về null để không render gì cả
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route exact path="/" element={<HomeLayout />} />
        <Route exact path="/duancntt" element={<HomePage />} />
        <Route exact path="/duancaphuyen" element={<DuAnCapHuyen />} />
        <Route exact path="/duancaphuyen/:id" element={<DuAnHuyen />} />
        <Route exact path="/duancntt/:id" element={<InfomationProjects />} />
        <Route exact path="/duancntt/update/:id" element={<FormDuAnCNTT />} />
        <Route exact path="/duancntt/target/:id" element={<FormTarget />} />
        <Route exact path="/duancntt/create" element={<FormCreateDuAn />} />
      </Route>
      <Route path="" element={<ProtectedLayout />}>
        <Route path="/examination/:id" element={<Examination />} />
      </Route>
      <Route path="" element={<ProtectedLayout />}>
        <Route path="/congviec" element={<MarkTest />} />
        <Route path="/congviec/:id" element={<ExamDetail />} />
      </Route>
      <Route path="" element={<ProtectedLayout />}>
        <Route path="/congviec-ktdt" element={<CongViecKTDT />} />
        <Route path="/congviec-ktdt/:id" element={<CongViecKTDT />} />
      </Route>
      <Route path="" element={<ProtectedLayout />}>
        {/* ✅ MobilePageLayout là cha của tất cả route con mobile */}
        <Route path="mobile" element={<MobilePageLayout />}>
          <Route index element={<MobilePageHome />} />
          <Route path="mobile/chamcong" element={<CheckinCalendarTime />} />
          <Route path="settings" element={<ProfileScreen />} />
        </Route>
      </Route>
      <Route path="" element={<ProtectedLayout />}>
        <Route path="/baocao/cntt-dia-ban" element={<ExternalRedirect />} />
        <Route path="/baocao/doanhthu" element={<BaoCaoDoanhThuCNTTPage />} />
        <Route path="/baocao/doanhthutonghop" element={<BaoCaoDoanhThuTongHop />} />
        <Route path="/baocao/doanhthuhachtoan" element={<BaoCaoDoanhThuHoachToan />} />
      </Route>
      <Route path="" element={<ProtectedLayout />}>
        <Route path="/report" element={<ReportPage />} />
        <Route path="/report/settings" element={<SettingsDoanhThu />} />
      </Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
