import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { isUndefined } from "lodash";
import { observer } from "mobx-react-lite";
import { Error, Pagination, PostList } from "components";
import { getPageCount } from "utils";
import { PostService } from "api";
import { SearchLoading } from ".";
import constants from "constants/Constants";
import style from "./SearchPosts.module.scss";

const SearchPosts = observer(() => {
   const [searchParams] = useSearchParams();
   const [totalPages, setTotalPages] = useState(0);
   const page = Number(searchParams.get("page")) || 1;
   const search = searchParams.get("search");

   const { data, isLoading, isError, refetch } = useQuery(
      ["search_posts"],
      async () => {
         if (search) {
            const response = await PostService.searchAll(
               page,
               constants.SEARCH_POSTS_QUERY_LIMIT,
               search,
            );
            setTotalPages(
               getPageCount(
                  response.headers["x-total-count"],
                  constants.SEARCH_POSTS_QUERY_LIMIT,
               ),
            );
            return response.data;
         }
      },
   );

   useEffect(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, search]);

   return (
      <>
         <Helmet>
            <title>Поиск</title>
         </Helmet>
         <div className={style.search}>
            {isLoading && <SearchLoading />}
            {isError && <Error />}
            {!isUndefined(data) && data.length > 0 ? (
               <>
                  <h1 className={style.search__string}>Поиск - {search}</h1>
                  <PostList data={data} />
                  <Pagination totalPages={totalPages} page={page} />
               </>
            ) : (
               !isLoading && (
                  <h1 className={style.search__string}>Ничего не найдено</h1>
               )
            )}
         </div>
      </>
   );
});
export default SearchPosts;
