import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import style from "./BreadCrumbs.module.scss";

interface BreadCrumbsProps {
   header: string;
}

export const BreadCrumbs = observer(({ header }: BreadCrumbsProps) => {
   return (
      <div className={style.breadcrumbs}>
         <Link className={style.breadcrumbs__link} to={`/posts`}>
            Посты
         </Link>
         <span className={style.breadcrumbs__slash}>&#9658;</span>
         <p>{header}</p>
      </div>
   );
});
