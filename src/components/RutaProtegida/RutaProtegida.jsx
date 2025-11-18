
import { useAuthContext} from "../../context/AuthContext/UseAuthContext"; // adjust the path
import { Navigate } from "react-router-dom";

export const RutaProtegida = ({children}) => {
    const { user } = useAuthContext();
    if (!user) {
        return <Navigate to="/admin" replace />;
    }
    
    return children
}