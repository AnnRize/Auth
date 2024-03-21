import { useState } from "react";
import { useQuery } from "react-query";
import { getPageCount } from "utils";
import { PostService } from "api";
import { OrderType, SortType } from "types";

export const usePosts = (
   query_name: string,
   page: number,
   limit: number,
   sort: SortType,
   order: OrderType,
) => {
   const [totalPages, setTotalPages] = useState(0);

   const { ...rest } = useQuery([query_name], async () => {
      const response = await PostService.getAll(page, limit, sort, order);

      setTotalPages(getPageCount(response?.headers["x-total-count"], limit));

      return response?.data;
   });

   return { totalPages, ...rest };
};
