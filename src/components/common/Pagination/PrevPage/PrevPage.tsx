import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { MyButton } from "interface";
import style from "./PrevPage.module.scss";

interface PrevPageProps {
   page: number;
}

export const PrevPage = observer(({ page }: PrevPageProps) => {
   const [, /* searchParams */ setSearchParams] = useSearchParams();
   return (
      <MyButton
         onClick={() => {
            setSearchParams((params) => {
               page > 2
                  ? params.set("page", `${page - 1}`)
                  : params.delete("page");

               return params;
            });
         }}
         className={style.prev_page_button}
         disabled={page === 1}
      >
         {"<"}
      </MyButton>
   );
});
