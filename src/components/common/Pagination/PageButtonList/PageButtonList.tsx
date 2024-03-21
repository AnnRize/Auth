import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { MyButton } from "interface";
import style from "./PageButtonList.module.scss";

interface PageButtonListProps {
   pagesArray: number[] | undefined;
   page: number;
}

export const PageButtonList = observer(
   ({ pagesArray, page }: PageButtonListProps) => {
      const [, /* searchParams */ setSearchParams] = useSearchParams();

      return pagesArray?.map((e) => (
         <MyButton
            key={e}
            onClick={() => {
               setSearchParams((params) => {
                  e > 1 ? params.set("page", `${e}`) : params.delete("page");
                  return params;
               });
            }}
            className={`${style.page_button} ${
               e === page && style.current_page_button
            }`}
         >
            {e}
         </MyButton>
      ));
   },
);
