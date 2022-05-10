import AppNavigate from "./AppNavigate";
import PrivateRoute from "./private-route";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./app.css";
import Modals from "../main/components/Modals";
import Intro from "../pages/Intro/intro"
import Dashboard from "../pages/dashboard/dashboard";
import Register from "../pages/register/register"
import UserDashboard from "../pages/dashboard/userDashboard/index"

const App = () => {
  return (
    <BrowserRouter>
      <AppNavigate />
      <Modals />
      <Routes>
        <Route index element={<Navigate to="/intro" />} />
        <Route path="/intro" element={<PrivateRoute isPageLogin>{<Intro />}</PrivateRoute>} />
        <Route path="/register" element={<PrivateRoute isPageLogin><Register /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute>{<Dashboard />}</PrivateRoute>} />
        <Route path="/dashboard-user" element={<PrivateRoute>{<UserDashboard />}</PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
