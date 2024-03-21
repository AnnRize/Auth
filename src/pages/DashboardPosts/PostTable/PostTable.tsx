import { Dispatch } from "react";
import { observer } from "mobx-react-lite";
import { SwapIcon } from "interface";
import { PostList } from "..";
import { IPost } from "types";
import style from "./PostTable.module.scss";

interface PostTableProps {
   orderSwap: () => void;
   setSorts: Dispatch<string>;
   data: IPost[];
}

export const PostTable = observer(
   ({ orderSwap, setSorts, data }: PostTableProps) => {
      return (
         <table className={style.post_table}>
            <caption>Список постов</caption>
            <thead>
               <tr>
                  <th
                     onClick={() => {
                        orderSwap();
                        setSorts("byDateAdded");
                     }}
                  >
                     <span>
                        ID <SwapIcon />
                     </span>
                  </th>
                  <th
                     onClick={() => {
                        orderSwap();
                        setSorts("byName");
                     }}
                  >
                     <span>
                        Заголовок <SwapIcon />
                     </span>
                  </th>
                  <th>Дата добавления</th>
               </tr>
            </thead>
            <tbody>
               <PostList data={data} />
            </tbody>
         </table>
      );
   },
);
