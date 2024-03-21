/* eslint-disable mobx/missing-observer */
import { makeAutoObservable } from "mobx";
import { ILogin, IUser } from "types/user";
import Cookies from "universal-cookie";

//Глобальное хранилище
export const User = () => {
   const cookies = new Cookies(null, { path: "/" });

   const isToken = cookies.get("token"); // Наличие токена в куки
   const isUser = cookies.get("user"); // Наличие данных пользователя в куки
   let tempUser;

   if (isToken && isUser) {
      // Если токен и данные в наличии, тогда пользователь в сети
      tempUser = isUser;
   } else {
      // Иначе не в сети
      cookies.remove("user");
      cookies.remove("token");
      tempUser = null;
   }

   return makeAutoObservable(
      {
         user: tempUser as IUser | null,

         setUser(value: IUser) {
            delete value.password;
            this.user = value;
            cookies.set("user", value, {
               maxAge: 3600 * 4,
            });
         },

         login(newUser: ILogin) {
            cookies.set("token", newUser.accessToken, {
               maxAge: 3600 * 4,
            });
            cookies.set("user", newUser.user, {
               maxAge: 3600 * 4,
            });
            this.user = newUser.user;
         },

         logout() {
            cookies.remove("user");
            cookies.remove("token");
            this.user = null;

            // window.location.reload();
         },
      },
      {},
      { autoBind: true },
   );
};
