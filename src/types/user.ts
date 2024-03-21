export interface IUser {
   name: string;
   dateOfBirth?: string;
   image: string;
   email: string;
   password?: string | null;
   role: string;
   id: number;
}

export interface ILogin {
   user: IUser;
   accessToken: string;
}

export type IUsersSort = "id" | "name" | "password" | "email" | "role";

export type IRegUser = Pick<IUser, "password" | "email" | "name">;
export type ILoginUser = Pick<IUser, "password" | "email">;

export type IUpdateUser = Pick<IUser, "dateOfBirth" | "email" | "name">;

export type IUpdateRole = Pick<IUser, "role">;
export type ICreateUser = Pick<IUser, "password" | "email" | "name" | "role">;
