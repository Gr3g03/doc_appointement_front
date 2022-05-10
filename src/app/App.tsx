import AppNavigate from "./AppNavigate";
import PrivateRoute from "./private-route";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./app.css";
import Header from "../main/components/Header";
import Modals from "../main/components/Modals";
import Intro from "../pages/Intro";
import Dashboard from "../pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <AppNavigate />
      <Modals />
      <Header />
      <Routes>
        <Route index element={<Navigate to="/intro" />} />
        <Route
          path="/intro"
          element={<PrivateRoute isPageLogin>{<Intro />}</PrivateRoute>}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute>{<Dashboard />}</PrivateRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
