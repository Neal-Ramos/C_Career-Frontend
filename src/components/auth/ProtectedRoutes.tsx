import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const accessToken = localStorage.getItem('AccessToken');

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;