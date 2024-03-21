import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { IPost } from "types";
import style from "./LastPostItem.module.scss";

interface LastPostItemProps {
   post: IPost;
}

export const LastPostItem = observer(({ post }: LastPostItemProps) => {
   const nav = useNavigate();
   return (
      <article
         onClick={() => nav(`/posts/${post.id}`)}
         className={style.last_post}
      >
         <img className={style.last_post__photo} src={post.smimg} />
         <h1 className={style.last_post__title}>{post.header}</h1>
      </article>
   );
});
