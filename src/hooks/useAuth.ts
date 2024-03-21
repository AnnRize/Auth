import { UserContext } from "contexts/UserProvider";
import { useContext } from "react";

export function useAuth() {
   return useContext(UserContext);
}
