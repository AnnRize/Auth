import { useSearchParams } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { observer } from "mobx-react-lite";
import { MyButton, SwapIcon } from "interface";
import { customSelect } from "utils";
import { IPostOption } from "types";
import style from "./SortPosts.module.scss";

const options: IPostOption[] = [
   { value: "byDateAdded", label: "По дате добавления" },
   { value: "byName", label: "По наименованию" },
];

interface SortPostsProps {
   sort: string;
   order: string;
}

export const SortPosts = observer(({ sort, order }: SortPostsProps) => {
   const [, /* searchParams */ setSearchParams] = useSearchParams();

   const orderSwap = () => {
      setSearchParams((params) => {
         order === "asc" ? params.set("order", "desc") : params.delete("order");
         return params;
      });
   };

   const sortChange = (e: SingleValue<IPostOption>) => {
      setSearchParams((params) => {
         params.delete("order");
         sort === "byDateAdded"
            ? params.set("sort", e!.value)
            : params.delete("sort");
         return params;
      });
   };

   return (
      <div className={style.sort}>
         <Select
            isSearchable={false}
            options={options}
            defaultValue={options.find((e) => e.value === sort)}
            styles={customSelect}
            onChange={sortChange}
            isMulti={false}
         />
         <MyButton
            onClick={orderSwap}
            className={`${style.sort__button} ${
               order === "desc" ? style.sort__button_order_active : ""
            }`}
         >
            <SwapIcon />
         </MyButton>
      </div>
   );
});
