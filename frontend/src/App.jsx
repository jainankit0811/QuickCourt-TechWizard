
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminRoutes from "./router/AdminRoutes";
import OwnerRoutes from "./router/OwnerRoutes";
import UserRouter from "./router/UserRouter";
import LandingPage from "./screen/LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<UserRouter />} />
        <Route path="/owner/*" element={<OwnerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;