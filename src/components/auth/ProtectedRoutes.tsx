import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../../helpers/JwtDecode";

const ProtectedRoutes = () => {
    const accessToken = localStorage.getItem('AccessToken');
    if (!accessToken || isTokenExpired(accessToken)) {
        return <Navigate to="/login" replace />;
    }
    
    return <Outlet />;
};

export default ProtectedRoutes;