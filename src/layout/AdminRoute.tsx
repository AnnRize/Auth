import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "hooks";

const AdminRoute = observer(() => {
   const {
      userStore: { user },
   } = useStore();

   if (user?.role === "admin") {
      return <Outlet />;
   } else {
      return <Navigate to="/" replace />;
   }
});

export default AdminRoute;
