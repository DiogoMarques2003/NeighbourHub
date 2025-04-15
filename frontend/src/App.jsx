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

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider> 
          <Routes>
            {/* Public routes */}
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path={"/"} element={<ChooseCondominium />} />
              <Route path={"/condominium"} element={<ChooseCondominium />} />

              {/* Protected routes with fixed side bar */}
              <Route element={<HomeLayout />}>
                <Route path={"/condominium/:condominiumId"} element={<HomePage />} />
                <Route path={"/condominium/:condominiumId/espacos"} element={<CommonAreasPage />} />
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