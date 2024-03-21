import { observer } from "mobx-react-lite";
import { CalendarIcon } from "interface";
import { IPost } from "types";
import style from "./PostData.module.scss";

interface PostDataProps {
   postItem: IPost;
}

export const PostData = observer(({ postItem }: PostDataProps) => {
   return (
      <article className={style.post}>
         <picture className={style.post__picture}>
            <source
               type="image/webp"
               srcSet={postItem.smimg}
               media="(max-width:1000px)"
            />
            <img src={postItem.laimg} className={style.post__photo} alt="img" />
         </picture>

         <h1 className={style.post__title}>{postItem.header}</h1>
         <p className={style.post__description}>{postItem.description}</p>
         <div className={style.post__date}>
            <time className={style.date}>{postItem.time}</time>
            <CalendarIcon />
         </div>
      </article>
   );
});
