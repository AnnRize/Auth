/* eslint-disable mobx/missing-observer */
import _ from "lodash";
import style from "./UsersSkelet.module.scss";

interface UsersLoadingProps {
   limit: number;
}

export const UsersSkelet = ({ limit }: UsersLoadingProps) => {
   const skeletonArray = _.range(1, limit + 1);
   return skeletonArray.map((e) => (
      <div key={e} className={style.user_skelet}>
         <div className={style.user_skelet__photo} />
         <div className={style.user_skelet__info}>
            <div className={style.info__item}></div>
            <div className={style.info__item}></div>
         </div>
      </div>
   ));
};
