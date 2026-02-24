import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import ProtectedLayout from './components/ProtectLayout';
import NotFoundPage from './pages/NotFound';
import CongViecLanhDao from './pages/CongViecLanhDao';
import ExamDetail from './pages/CongViecLanhDao/ExamDetail';
import InfomationProjects from './pages/InfomationProjects';
import FormDuAnCNTT from './pages/FormDuAnCNTT';
import FormTarget from './pages/FormTarget';
import FormCreateDuAn from './pages/FormCreateDuAn';
import DuAnCapHuyen from './pages/DuAnCapHuyen';
import DuAnHuyen from './pages/DuAnCapHuyen/DuAnHuyen';
import HomeLayout from './components/HomeLayout';
import HomePage from './pages/Home';
import ReportPage from './pages/Report';
import SettingsDoanhThu from './pages/SettingsDoanhThu';
import MobilePageHome from './pages/MobilePage';
import MobilePageLayout from './pages/MobilePage/Layout';
import ProfileScreen from './pages/MobilePage/ProfileScreen';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/duancntt" element={<HomePage />} />
        <Route path="/duancapxa" element={<DuAnCapHuyen />} />
        <Route path="/duancapxa/:id" element={<DuAnHuyen />} />
        <Route path="/duancntt/:id" element={<InfomationProjects />} />
        <Route path="/duancntt/update/:id" element={<FormDuAnCNTT />} />
        <Route path="/duancntt/target/:id" element={<FormTarget />} />
        <Route path="/duancntt/create" element={<FormCreateDuAn />} />
        <Route path="/congviec" element={<CongViecLanhDao />} />
        <Route path="/congviec/:id" element={<ExamDetail />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/report/settings" element={<SettingsDoanhThu />} />
      </Route>
      {/* Mobile routes use their own layout */}
      <Route path="mobile" element={<MobilePageLayout />}>
        <Route index element={<MobilePageHome />} />
        <Route path="settings" element={<ProfileScreen />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
