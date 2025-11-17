
import { UseAuthContext} from "../../context/AuthContext/UseAuthContext"; // adjust the path
import { Navigate } from "react-router-dom";

export const RutaProtegida = ({children}) => {
    const { user } = UseAuthContext();
    if (!user) {
        return <Navigate to="/admin" replace />;
    }
    
    return children
}