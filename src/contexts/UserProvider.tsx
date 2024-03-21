/* eslint-disable mobx/missing-observer */
// Cookies
import { Dispatch, ReactNode, createContext, useEffect, useState } from "react";
import { ILogin, IUser } from "types/user";
import Cookies from "universal-cookie";

interface UserContextProps {
   user: IUser | null;
   setUser: Dispatch<IUser | null>;
   logIn: (newUser: ILogin) => void;
   logOut: () => void;
}

interface UserProviderProps {
   children: ReactNode;
}

export const UserContext = createContext<UserContextProps | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {
   const [user, setUser] = useState<IUser | null>(null);
   const cookies = new Cookies(null, { path: "/" });

   const isToken = cookies.get("token");
   const isUser = cookies.get("user");

   const logIn = (newUser: ILogin) => {
      cookies.set("token", newUser.accessToken, {
         maxAge: 3600 * 4,
      });
      cookies.set("user", newUser.user, {
         maxAge: 3600 * 4,
      });
      setUser(newUser.user);
   };

   const logOut = () => {
      cookies.remove("user");
      cookies.remove("token");
      setUser(null);
   };

   useEffect(() => {
      if (isToken && isUser) {
         setUser(isUser);
      } else {
         logOut();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <UserContext.Provider value={{ user, setUser, logIn, logOut }}>
         {children}
      </UserContext.Provider>
   );
};
export default UserProvider;

// LocalStorage

/* import { ReactNode, createContext, useEffect, useState } from "react";
import { IUser } from "types/user";

interface UserContextProps {
   user: IUser | null;
   logIn: (newUser: IUser) => void;
   logOut: () => void;
}

interface UserProviderProps {
   children: ReactNode;
}

export const UserContext = createContext<UserContextProps>({
   user: null,
   logIn: () => {},
   logOut: () => {},
});

const UserProvider = ({ children }: UserProviderProps) => {
   const [user, setUser] = useState<IUser | null>(null);

   const isLogged = localStorage.getItem("user");

   const logIn = (newUser: IUser) => {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
   };

   const logOut = () => {
      setUser(null);
      localStorage.removeItem("user");
   };

   useEffect(() => {
      if (isLogged) {
         setUser(JSON.parse(isLogged));
      }
   }, [isLogged]);

   return (
      <UserContext.Provider value={{ user, logIn, logOut }}>
         {children}
      </UserContext.Provider>
   );
};
export default UserProvider;
 */
