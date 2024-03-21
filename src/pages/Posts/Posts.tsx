import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Error, Pagination, PostList } from "components";
import { PostLoading, SortPosts } from ".";
import { usePosts } from "hooks";
import constants from "constants/Constants";
import { OrderType, SortType } from "types";
import style from "./Posts.module.scss";

const Posts = observer(() => {
   const [searchParams] = useSearchParams();
   const page = Number(searchParams.get("page")) || 1;
   const order: OrderType = searchParams.get("order") || "asc";
   const sort: SortType = searchParams.get("sort") || "byDateAdded";

   const { data, isLoading, isError, totalPages, refetch } = usePosts(
      "posts",
      page,
      constants.POSTS_QUERY_LIMIT,
      sort,
      order,
   );

   useEffect(() => {
      refetch();
   }, [page, sort, order, refetch]);

   return (
      <>
         <Helmet>
            <title>Посты</title>
         </Helmet>
         <div className={style.container}>
            {isLoading && <PostLoading />}
            {isError && <Error />}
            {data && (
               <>
                  <SortPosts sort={sort} order={order} />
                  <PostList data={data} />
                  <Pagination totalPages={totalPages} page={page} />
               </>
            )}
         </div>
      </>
   );
});
export default Posts;
