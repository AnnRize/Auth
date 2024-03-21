import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { UserService } from "api";
import { getPageCount } from "utils";
import constants from "constants/Constants";

export const useInfinityData = () => {
   const [totalPages, setTotalPages] = useState(0);

   const { ...query } = useInfiniteQuery(
      ["users"],
      async ({ pageParam = 1 }) => {
         const response = await UserService.GetUsers(
            pageParam,
            constants.USERS_QUERY_LIMIT,
            "id",
            "desc",
         );
         setTotalPages(
            getPageCount(
               response.headers["x-total-count"],
               constants.USERS_QUERY_LIMIT,
            ),
         );
         return response;
      },
      {
         getNextPageParam: (_lastPage, pages) => {
            if (pages.length < totalPages) {
               return pages.length + 1;
            } else {
               return undefined;
            }
         },
      },
   );

   return {
      ...query,
   };
};
