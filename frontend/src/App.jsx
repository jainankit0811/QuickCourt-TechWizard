import { BrowserRouter, Routes } from "react-router-dom";
import AdminRoutes from "./router/AdminRoutes";
import OwnerRoutes from "./router/OwnerRoutes";
import UserRoutes from "./router/UserRouter"; // Rename to match others

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {AdminRoutes()}
        {OwnerRoutes()}
        {UserRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default App;