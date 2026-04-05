import { Navigate, Outlet } from "react-router-dom";
import useActivityTracker from "../../Hooks/useActivityTracker";

const ProtectedRoutes = () => {
    const accessToken = localStorage.getItem('AccessToken');
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    useActivityTracker();
    return <Outlet />;
};

export default ProtectedRoutes;