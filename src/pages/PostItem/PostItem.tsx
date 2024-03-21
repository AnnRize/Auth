import { Helmet } from "react-helmet-async";
import { observer } from "mobx-react-lite";
import { Error, LoadSpinner } from "components";
import { BreadCrumbs, LastPostList, PostData, usePostItem } from ".";
import style from "./PostItem.module.scss";

const PostItem = observer(() => {
   const {
      postItem,
      lastPost,
      postItemLoading,
      lastPostLoading,
      postItemError,
   } = usePostItem();

   return (
      <>
         <Helmet>
            <title>{postItem?.header}</title>
         </Helmet>
         {postItemError && <Error />}
         <div className={style.post}>
            {(postItemLoading || lastPostLoading) && <LoadSpinner />}

            {postItem && (
               <div className={style.post_item__container}>
                  <BreadCrumbs header={postItem.header} />
                  <PostData postItem={postItem} />
               </div>
            )}

            {lastPost && (
               <aside className={style.last_post__container}>
                  <h2 className={style.title}>Последние посты</h2>
                  <LastPostList lastPost={lastPost} />
               </aside>
            )}
         </div>
      </>
   );
});
export default PostItem;
