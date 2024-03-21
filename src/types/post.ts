export interface IPost {
   smimg: string;
   laimg: string;
   header: string;
   description: string;
   time: string;
   id: number;
}

export type ICreatePost = Omit<IPost, "id">;
export type ICreatePostNoTime = Omit<IPost, "id" | "time">;

export type SortType = "byDateAdded" | "byName" | string | null;
export type OrderType = "asc" | "desc" | string | null;
