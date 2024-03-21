/* eslint-disable mobx/missing-observer */
import { makeAutoObservable } from "mobx";
import { IPost, IUser } from "types";

//Глобальное хранилище
export const DashboardData = () => {
   return makeAutoObservable(
      {
         editMode: false,
         mode: 0,
         postData: null as IPost | null,
         userData: null as IUser | null,
         get data() {
            return this.postData ? this.postData : this.userData;
         },
         setEditMode(value: boolean) {
            this.editMode = value;
         },
         setMode(mode: number) {
            this.mode = mode;
         },
         setPostData(data: IPost | null) {
            this.postData = data;
         },
         setUserData(data: IUser | null) {
            this.userData = data;
         },
         fullReset() {
            this.postData = null;
            this.userData = null;
            this.mode = 0;
            this.editMode = false;
         },
      },
      {},
      { autoBind: true },
   );
};
