import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const {user, isLoading} = useSelector((state) => state.user);
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return children;
};

export default ProtectedRoute;
