import { observer } from "mobx-react-lite";
import { getAgeString } from "utils";
import { IUser } from "types";
import style from "./UserData.module.scss";
import { getAgeByDate } from "utils/getAgeByDate";

interface UserDataProps {
   data: IUser;
}

export const UserData = observer(({ data }: UserDataProps) => {
   return (
      <div className={style.user}>
         <div className={style.user__avatar}>
            <img src={data.image} className={style.avatar__image} />
         </div>
         <div className={style.user__info}>
            <h1 className={style.user__name}>{data.name}</h1>
            {data.dateOfBirth && (
               <h2 className={style.user__age}>
                  {getAgeString(getAgeByDate(data.dateOfBirth))}
               </h2>
            )}
            <h2 className={style.user__email}>{data.email}</h2>
         </div>
      </div>
   );
});
