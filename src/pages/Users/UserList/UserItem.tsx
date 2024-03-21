import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "hooks";
import { getAgeString } from "utils";
import { IUser } from "types";
import style from "./UserItem.module.scss";
import { getAgeByDate } from "utils/getAgeByDate";

interface UserItemProps {
   user: IUser;
}

export const UserItem = observer(({ user }: UserItemProps) => {
   const { userStore } = useStore();
   const nav = useNavigate();

   return (
      <article
         className={style.user}
         onClick={() => {
            if (user.id == userStore.user?.id) {
               nav(`/profile`);
            } else {
               nav(`/user/${user.id}`);
            }
         }}
         tabIndex={0}
      >
         <img src={user.image} className={style.user__avatar} />
         <section className={style.user__info}>
            <h2 className={style.user__name}>{user.name}</h2>
            {user.dateOfBirth && (
               <p className={style.user__age}>
                  {getAgeString(getAgeByDate(user.dateOfBirth))}
               </p>
            )}
         </section>
      </article>
   );
});
