import { observer } from "mobx-react-lite";
import { UserData } from "./UserData";
import { IUser } from "types";
import style from "./UserProfile.module.scss";

interface UserProfileProps {
   data: IUser;
}

export const UserProfile = observer(({ data }: UserProfileProps) => {
   return (
      <div className={style.user}>
         <UserData data={data} />
      </div>
   );
});
