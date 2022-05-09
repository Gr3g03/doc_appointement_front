import AppNavigate from './AppNavigate'
import PrivateRoute from './private-route';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TestPage from '../pages/login'
import DashboardPage from '../pages/dashboard'
import Register from '../pages/register/Register'

const App = () => {
  return (
    <BrowserRouter>
      <AppNavigate />
      <Routes>
        <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/login" element={<PrivateRoute isPageLogin><TestPage /></PrivateRoute>} />
        <Route path="/register" element={<PrivateRoute isPageLogin><Register /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
