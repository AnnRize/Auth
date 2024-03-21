import { observer } from "mobx-react-lite";
import { useStore } from "hooks";
import { IPost } from "types";
import style from "./PostData.module.scss";

interface PostDataProps {
   post: IPost;
}

export const PostData = observer(({ post }: PostDataProps) => {
   const {
      dashboardDataStore: { setEditMode, postData, setPostData },
   } = useStore();

   return (
      <tr
         className={`${style.post_data_row} ${
            post.id === postData?.id && style.active
         }`}
         onClick={() => {
            setEditMode(true);
            setPostData({ ...post });
         }}
      >
         <td>{post.id}</td>
         <td>{post.header}</td>
         <td>{post.time}</td>
      </tr>
   );
});
