import { Dispatch, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { InputClear, MyButton, MyInput, SearchIcon } from "interface";
import style from "./SearchBar.module.scss";

interface SearchBarProps extends HTMLAttributes<HTMLElement> {
   search: string;
   setSearch: Dispatch<string>;
}

export const SearchBar = observer(
   ({ search, setSearch, className }: SearchBarProps) => {
      return (
         <div className={`${style.search} ${className}`}>
            <MyInput
               onChange={(e) => setSearch(e.target.value)}
               type="text"
               className={style.search__input}
               placeholder="Поиск"
               value={search}
            />
            <MyButton
               className={style.search__clear_button}
               onClick={() => setSearch("")}
               aria-label="Clear"
            >
               <InputClear className={style.clear_icon} />
            </MyButton>

            <div className={style.search__button}>
               <Link
                  className={style.search__link}
                  onClick={(e) => !search && e.preventDefault()}
                  to={{ pathname: "/search", search: `?search=${search}` }}
                  state={{ searchQueryString: search }}
                  aria-label="Search"
               >
                  <SearchIcon className={style.search_icon} />
               </Link>
            </div>
         </div>
      );
   },
);
