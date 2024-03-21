import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { PostService } from "api";
import constants from "constants/Constants";

export const usePostItem = () => {
   const { id } = useParams();

   const {
      data: postItem,
      isLoading: postItemLoading,
      error: postItemError,
   } = useQuery(["post_item", id], async () => {
      const response = await PostService.getById(Number(id));
      return response.data;
   });

   const { data: lastPost, isLoading: lastPostLoading } = useQuery(
      ["last_post"],
      async () => {
         const response = await PostService.getAll(
            1,
            constants.LAST_POSTS_QUERY_LIMIT,
            "byDateAdded",
            "asc",
         );
         return response?.data;
      },
   );

   return {
      postItem,
      lastPost,
      postItemLoading,
      lastPostLoading,
      postItemError,
   };
};
