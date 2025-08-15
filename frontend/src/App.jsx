import { BrowserRouter } from "react-router-dom";
import AdminRoutes from "./router/AdminRoutes";
import OwnerRoutes from "./router/OwnerRoutes";
import UserRouter from "./router/UserRouter";

const App = () => {
  return (
    <BrowserRouter>
      <OwnerRoutes />
      {/* <UserRouter /> */}
      {/* <AdminRoutes /> */}
    </BrowserRouter>
  );
};

export default App;