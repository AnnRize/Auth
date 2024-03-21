import Cookies from "universal-cookie";
import axios from "axios";
import {
   ICreatePost,
   ICreatePostNoTime,
   IPost,
   SortType,
   OrderType,
} from "types";

const URL = "http://localhost:4200";

const cookies = new Cookies(null, { path: "/" });

const adminPosts = axios.create({
   baseURL: URL,
   headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
   },
});

axios.defaults.baseURL = URL;
axios.defaults.withCredentials = true;

export const PostService = {
   async getAll(
      page: number,
      limit: number,
      sort: SortType = null,
      order: OrderType = null,
   ) {
      switch (sort) {
         case "byName": {
            const response = await axios.get<IPost[]>("/posts", {
               params: {
                  _limit: limit,
                  _page: page,
                  _sort: "header",
                  _order: order === "asc" ? "asc" : "desc",
               },
            });
            return response;
         }
         case "byDateAdded": {
            const response = await axios.get<IPost[]>("/posts", {
               params: {
                  _limit: limit,
                  _page: page,
                  _sort: "id",
                  _order: order === "asc" ? "desc" : "asc",
               },
            });
            return response;
         }
         default: {
            const response = await axios.get<IPost[]>("/posts", {
               params: {
                  _limit: limit,
                  _page: page,
               },
            });
            return response;
         }
      }
   },

   async getById(id: number) {
      const response = await axios.get<IPost>(`/posts/${id}`);
      return response;
   },

   async searchAll(page: number, limit: number, search: string) {
      const response = await axios.get<IPost[]>("/posts", {
         params: {
            _limit: limit,
            _page: page,
            header_like: search,
            _sort: "id",
            _order: "desc",
         },
      });
      return response;
   },

   async createPost(data: ICreatePost) {
      const response = await adminPosts.post("/posts", data);
      return response;
   },
   async deletePostById(id: number) {
      const response = await adminPosts.delete(`/posts/${id}`);
      return response;
   },
   async updatePostById(id: number, data: ICreatePostNoTime) {
      const response = await adminPosts.patch(`/posts/${id}`, data);
      return response;
   },
};
