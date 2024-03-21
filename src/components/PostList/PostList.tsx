import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Post } from "./Post";
import { IPost } from "types";
import style from "./PostList.module.scss";

interface PostListProps {
   data: IPost[];
}

export const PostList: FC<PostListProps> = observer(({ data }) => {
   return (
      <div className={style.post_block}>
         {data?.map((post) => (
            <Post key={post.id} post={post} />
         ))}
      </div>
   );
});
