import AdminRoutes from "./router/AdminRoutes";
import OwnerRoutes from "./router/OwnerRoutes";
import UserRouter from "./router/UserRouter";

const App = () => {
  return (
    <>
      <OwnerRoutes />
      <UserRouter />
      <AdminRoutes />
    </>

  );
}

export default App;