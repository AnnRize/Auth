import { observer } from "mobx-react-lite";
import { ProfileData } from "./ProfileData";
import { IUser } from "types";
import style from "./ProfileContainer.module.scss";

interface ProfileContainerProps {
   data: IUser;
}

export const ProfileContainer = observer(({ data }: ProfileContainerProps) => {
   return (
      <div className={style.profile}>
         <ProfileData data={data} />
      </div>
   );
});
