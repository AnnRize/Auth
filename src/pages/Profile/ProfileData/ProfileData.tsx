import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { MyButton } from "interface";
import { getAgeString } from "utils";
import { IUser } from "types";
import style from "./ProfileData.module.scss";
import { getAgeByDate } from "utils/getAgeByDate";

interface ProfileDataProps {
   data: IUser;
}

export const ProfileData = observer(({ data }: ProfileDataProps) => {
   const nav = useNavigate();

   return (
      <div className={style.user}>
         <div className={style.user__avatar}>
            <img src={data.image} className={style.avatar__image} />
            {/* <div
         style={{
            background: `url(${data.image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            borderRadius: "10px",
            aspectRatio: "1/1",
         }}
      /> */}
            <MyButton
               className={style.avatar__settings_button}
               onClick={() => nav(`/profile/settings`)}
            >
               Редактировать
            </MyButton>
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
