import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ChooseCondominium from './pages/ChooseCondominiumPage';
import HomeLayout from './components/layout/HomeLayout';
import CommonAreasPage from './pages/CommonAreasPage';
import CreateCondominium from './pages/CreateCondominiumPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import './App.css';
import CreateCommonAreasPage from './pages/CreateCommonAreasPage';
import UserSettingsPage from './pages/UserSettingsPage';
import ReservationCommonAreaPage from './pages/ReservationCommonAreaPage';
import NotFoundPage from './pages/NotFoundPage';
import OrdersPage from './pages/OrdersPage';
import EditCommonAreaPage from './pages/EditCommonAreaPage';
import SettingsCondominiumPage from './pages/SettingsCondominiumPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/register'} element={<RegisterPage />} />
            <Route path={'/NotFound'} element={<NotFoundPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path={'/'} element={<ChooseCondominium />} />
              <Route path={'/condominium'} element={<ChooseCondominium />} />
              <Route path={'/condominiumcreate'} element={<CreateCondominium />} />
              <Route path={'/settings'} element={<UserSettingsPage />} />

              {/* Protected routes with fixed side bar */}
              <Route element={<HomeLayout />}>
                <Route path={'/condominium/:condominiumId'} element={<HomePage />} />
                <Route path={'/condominium/:condominiumId/commonarea'} element={<CommonAreasPage />} />
                <Route
                  path={'/condominium/:condominiumId/commonarea/:commonAreaId'}
                  element={<ReservationCommonAreaPage />}
                />
                <Route
                  path={'/condominium/:condominiumId/commonarea/:commonAreaId/edit'}
                  element={<EditCommonAreaPage />}
                />
                <Route path={'/condominium/:condominiumId/commonarea/create'} element={<CreateCommonAreasPage />} />
                <Route path={'/condominium/:condominiumId/services'} element={<ServicesPage />} />
                <Route path={'/condominium/:condominiumId/services/:serviceId'} element={<ServiceDetailsPage />} />
                <Route path={'/condominium/:condominiumId/orders'} element={<OrdersPage />} />
                <Route path={'/condominium/:condominiumId/settings'} element={<SettingsCondominiumPage />} />
              </Route>
            </Route>

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/NotFound" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
