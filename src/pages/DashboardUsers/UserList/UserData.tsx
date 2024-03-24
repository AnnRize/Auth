import { observer } from "mobx-react-lite";
import { useStore } from "hooks";
import { IUser } from "types";
import style from "./UserData.module.scss";

interface UserDataProps {
   user: IUser;
}

export const UserData = observer(({ user }: UserDataProps) => {
   const {
      dashboardDataStore: { setEditMode, getUser, setCurrentData },
   } = useStore();

   return (
      <tr
         className={`${style.user_data_row} ${
            user.id === getUser?.id && style.active
         }`}
         onClick={() => {
            setEditMode(true);
            setCurrentData({ ...user });
         }}
      >
         <td>{user.id}</td>
         <td className={style.user_password}>{user.password}</td>
         <td>{user.email}</td>
         <td>{user.role}</td>
      </tr>
   );
});
