import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../frontend/src/pages/LoginPage';


const App = () => {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          /> */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
};

export default App;