import { Dispatch } from "react";
import { observer } from "mobx-react-lite";
import { SwapIcon } from "interface";
import { UserList } from "..";
import { IUser, IUsersSort } from "types";
import style from "./UsersTable.module.scss";

interface UsersTableProps {
   orderSwap: () => void;
   setSorts: Dispatch<IUsersSort>;
   data: IUser[];
}

export const UsersTable = observer(
   ({ orderSwap, setSorts, data }: UsersTableProps) => {
      return (
         <table className={style.users_table}>
            <caption>Список пользователей</caption>
            <thead>
               <tr>
                  <th
                     onClick={() => {
                        orderSwap();
                        setSorts("id");
                     }}
                  >
                     <span>
                        ID <SwapIcon />
                     </span>
                  </th>
                  <th
                     onClick={() => {
                        orderSwap();
                        setSorts("password");
                     }}
                  >
                     <span>
                        Пароль <SwapIcon />
                     </span>
                  </th>
                  <th
                     onClick={() => {
                        orderSwap();
                        setSorts("email");
                     }}
                  >
                     <span>
                        Почта <SwapIcon />
                     </span>
                  </th>
                  <th
                     onClick={() => {
                        orderSwap();
                        setSorts("role");
                     }}
                  >
                     <span>
                        Роль <SwapIcon />
                     </span>
                  </th>
               </tr>
            </thead>
            <tbody>
               <UserList data={data} />
            </tbody>
         </table>
      );
   },
);
