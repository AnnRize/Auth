import { observer } from "mobx-react-lite";
import { useStore } from "hooks";
import { IPost } from "types";
import style from "./PostData.module.scss";

interface PostDataProps {
   post: IPost;
}

export const PostData = observer(({ post }: PostDataProps) => {
   const {
      dashboardDataStore: { setEditMode, getPost, setCurrentData },
   } = useStore();

   return (
      <tr
         className={`${style.post_data_row} ${
            post.id === getPost?.id && style.active
         }`}
         onClick={() => {
            setEditMode(true);
            setCurrentData({ ...post });
         }}
      >
         <td>{post.id}</td>
         <td>{post.header}</td>
         <td>{post.time}</td>
      </tr>
   );
});
