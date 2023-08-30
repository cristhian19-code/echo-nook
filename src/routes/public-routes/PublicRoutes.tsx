import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {RootState} from "../../redux/store";


export const PublicRoute = (props: any) => {
    const { user } = useSelector((state: RootState) => state.users);
    return !user ? { ...props.children } : <Navigate to="/" />;
};

export default PublicRoute;