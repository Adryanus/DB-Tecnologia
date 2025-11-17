import { useContext } from "react"
import { AuthContext } from "../AuthContext/AuthContext";

export const UseAuthContext = () => {
    return useContext(AuthContext);
}