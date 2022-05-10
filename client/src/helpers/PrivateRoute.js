import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const userProfile = useSelector((state) => state.profile.userProfile);

  return userProfile ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
