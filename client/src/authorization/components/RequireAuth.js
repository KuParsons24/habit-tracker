import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { authed, isLoading } = useAuth();
  const location = useLocation();
  if (!isLoading){
    if (authed === true){
      return children;
    } else {
      return <Navigate to='/signin' state={{ from: location }} replace />; 
    }
  } else {
    return null;
  }
}