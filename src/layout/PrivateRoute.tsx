import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "hooks";

const PrivateRoute = observer(() => {
   const {
      userStore: { user },
   } = useStore();

   if (user) {
      return <Outlet />;
   } else {
      return <Navigate to="/login" replace />;
   }
});

export default PrivateRoute;
