import { AxiosResponse } from "axios";
import { observer } from "mobx-react-lite";
import { InfiniteData } from "react-query";
import React from "react";
import { UserItem } from "./UserItem";
import { IUser } from "types";

export const UserList = observer(
   ({ pages }: InfiniteData<AxiosResponse<IUser[]>>) => {
      return pages.map((group, i) => {
         return (
            <React.Fragment key={i}>
               {group?.data.map((user) => (
                  <UserItem key={user.id} user={user} />
               ))}
            </React.Fragment>
         );
      });
   },
);
