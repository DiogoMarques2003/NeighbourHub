import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../frontend/src/pages/LoginPage';
import PrivateRoute from './routes/PrivateRouter';


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="/NotFound" />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;