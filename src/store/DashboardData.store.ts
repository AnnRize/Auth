/* eslint-disable mobx/missing-observer */
import { makeAutoObservable } from "mobx";
import { IPost, IUser } from "types";

type dataType = IPost | IUser | null;

//Глобальное хранилище
export const DashboardData = () => {
   return makeAutoObservable(
      {
         editMode: false,
         mode: 0,
         currentData: null as dataType,

         get getPost() {
            return this.currentData as IPost;
         },
         get getUser() {
            return this.currentData as IUser;
         },

         setEditMode(value: boolean) {
            this.editMode = value;
         },
         setMode(mode: number) {
            this.mode = mode;
         },
         setCurrentData(data: dataType) {
            this.currentData = data;
         },
         fullReset() {
            this.currentData = null;
            this.mode = 0;
            this.editMode = false;
         },
      },
      {},
      { autoBind: true },
   );
};
