import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { MyButton } from "interface";
import style from "./NextPage.module.scss";

interface NextPageProps {
   page: number;
   totalPages: number;
}

export const NextPage = observer(({ page, totalPages }: NextPageProps) => {
   const [, /* searchParams */ setSearchParams] = useSearchParams();
   return (
      <MyButton
         onClick={() => {
            setSearchParams((params) => {
               params.set("page", `${page + 1}`);
               return params;
            });
         }}
         className={style.next_page_button}
         disabled={page === totalPages}
      >
         {">"}
      </MyButton>
   );
});
