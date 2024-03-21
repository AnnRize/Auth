/* eslint-disable mobx/missing-observer */
import style from "./SkeletonPost.module.scss";

export const SkeletonPost = () => {
   return (
      <div>
         <div className={style.post_skelet}>
            <div className={style.post_skelet__photo} />
            <div className={style.post_skelet__title} />
            <div className={style.post_skelet__description} />
            <div className={style.post_skelet__description} />
            <div className={style.post_skelet__description} />
         </div>
      </div>
   );
};
