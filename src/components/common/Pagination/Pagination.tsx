import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { getPageArray } from "utils";
import { NextPage, PageButtonList, PrevPage } from ".";
import style from "./Pagination.module.scss";

interface PaginationProps {
   totalPages: number;
   page: number;
}

export const Pagination = observer(({ totalPages, page }: PaginationProps) => {
   const pagesArray = useMemo(
      () => getPageArray(totalPages, page),
      [totalPages, page],
   );

   return (
      totalPages > 1 && (
         <div className={style.pages_container}>
            <p className={style.page_number}>стр. {page}</p>
            <div className={style.buttons_container}>
               <PrevPage page={page} />
               <PageButtonList pagesArray={pagesArray} page={page} />
               <NextPage page={page} totalPages={totalPages} />
            </div>
         </div>
      )
   );
});
