import { observer } from "mobx-react-lite";
import { LastPostItem } from "./LastPostItem";
import { IPost } from "types";
import style from "./LastPostList.module.scss";

interface LastPostListProps {
   lastPost: IPost[];
}

export const LastPostList = observer(({ lastPost }: LastPostListProps) => {
   return (
      <div className={style.last_post__list}>
         {lastPost.map((post) => (
            <LastPostItem key={post.id} post={post} />
         ))}
      </div>
   );
});
