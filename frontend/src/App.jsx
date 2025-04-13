import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ChooseCondominium from './pages/ChooseCondominiumPage';

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
              <Route path={"/"} element={<HomePage />} />
              <Route path={"/condominium"} element={<ChooseCondominium />} />
    
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