import { observer } from "mobx-react-lite";
import _ from "lodash";
import { SkeletonPost, SkeletonPostsSort } from "components";
import constants from "constants/Constants";
import style from "./PostLoading.module.scss";

export const PostLoading = observer(() => {
   const skeletonArray = _.range(1, constants.POSTS_QUERY_LIMIT + 1);
   return (
      <>
         <SkeletonPostsSort />
         <section className={style.posts_loading_grid}>
            {skeletonArray.map((e) => (
               <SkeletonPost key={e} />
            ))}
         </section>
      </>
   );
});
