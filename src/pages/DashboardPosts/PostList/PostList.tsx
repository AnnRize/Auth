import { observer } from "mobx-react-lite";
import { PostData } from "./PostData";
import { IPost } from "types";

interface PostListProps {
   data: IPost[];
}

export const PostList = observer(({ data }: PostListProps) => {
   return data.map((post) => <PostData key={post.id} post={post} />);
});
