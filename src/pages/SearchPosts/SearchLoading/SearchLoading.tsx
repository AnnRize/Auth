import _ from "lodash";
import { observer } from "mobx-react-lite";
import { SkeletonPost } from "components";
import constants from "constants/Constants";
import style from "./SearchLoading.module.scss";

export const SearchLoading = observer(() => {
   const skeletonArray = _.range(1, constants.SEARCH_POSTS_QUERY_LIMIT + 1);
   return (
      <div className={style.search_loading_grid}>
         {skeletonArray.map((e) => (
            <SkeletonPost key={e} />
         ))}
      </div>
   );
});
