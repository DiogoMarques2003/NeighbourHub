import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider> 
          <Routes>
            {/* Public routes */}
            {publicRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              {privateRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
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