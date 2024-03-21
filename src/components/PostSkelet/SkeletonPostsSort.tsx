/* eslint-disable mobx/missing-observer */
import style from "./SkeletonPostsSort.module.scss";

export const SkeletonPostsSort = () => {
   return (
      <div className={style.sort_skelet}>
         <div className={style.sort_skelet__select} />
         <div className={style.sort_skelet__order} />
      </div>
   );
};
