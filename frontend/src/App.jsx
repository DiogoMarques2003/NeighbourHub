import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import AuthGuard from './guards/AuthGuard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        
        {/* Protected routes */}
        <Route element={<AuthGuard />}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/NotFound" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;