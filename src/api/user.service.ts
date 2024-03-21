import axios from "axios";
import {
   ILoginUser,
   IRegUser,
   IUpdateUser,
   IUpdateRole,
   ICreateUser,
   IUser,
   ILogin,
   IUsersSort,
} from "types";
import Cookies from "universal-cookie";

const URL = "http://localhost:4200";

const cookies = new Cookies(null, { path: "/" });

const user = axios.create({
   baseURL: URL,
   headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
   },
});

axios.defaults.baseURL = URL;
axios.defaults.withCredentials = true;

export const UserService = {
   async RegUser(data: IRegUser) {
      const response = axios.post("/register", {
         email: data.email,
         password: data.password,
         role: "user",
         name: data.name,
         image: "/Avatar.jpg",
      });
      return response;
   },

   async LoginUser(data: ILoginUser) {
      const response = await axios.post<ILogin>("/login", {
         email: data.email,
         password: data.password,
      });
      return response.data;
   },

   async GetUsers(
      page: number,
      limit: number,
      sort: IUsersSort,
      order: "desc" | "asc",
   ) {
      const response = await axios.get<IUser[]>("/users", {
         params: {
            _page: page,
            _limit: limit,
            _sort: sort,
            _order: order === "desc" ? "desc" : "asc",
         },
      });
      return response;
   },

   async GetUserById(id: number) {
      const response = await axios.get<IUser>(`/users/${id}`);
      return response;
   },

   async UpdateUser(id: number, data: IUpdateUser) {
      const response = await user.patch(`/users/${id}`, data);
      return response;
   },

   async createUser(data: ICreateUser) {
      const response = await axios.post("/users", {
         password: data.password,
         email: data.email,
         role: data.role,
         name: data.name,
         image: "/Avatar.jpg",
      });

      return response;
   },

   async updateRole(id: number, data: IUpdateRole) {
      const response = await user.patch(`/users/${id}`, data);
      return response;
   },

   async deleteUser(id: number) {
      const response = await user.delete(`/users/${id}`);
      return response;
   },

   async emailCheck(email: string) {
      const response = await user.get("/users", {
         params: {
            email: email,
         },
      });
      return response.data[0];
   },
};
