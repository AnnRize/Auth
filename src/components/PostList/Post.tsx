/* eslint-disable mobx/missing-observer */
import { FC, MouseEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { CalendarIcon } from "interface";
import { IPost } from "types";
import style from "./Post.module.scss";

interface PostProps {
   post: IPost;
}

export const Post: FC<PostProps> = observer(({ post }) => {
   const [mousePosition, setMousePosition] = useState({
      positionX: 0,
      positionY: 0,
   });

   const ref = useRef<HTMLElement>(null);
   const nav = useNavigate();

   const MouseMove: MouseEventHandler = (e) => {
      setMousePosition({
         positionX: e.clientX - ref.current!.offsetLeft + scrollX,
         positionY: e.clientY - ref.current!.offsetTop + scrollY,
      });
   };

   return (
      <article
         onClick={() => nav(`/posts/${post.id}`)}
         ref={ref}
         className={style.post_item}
         onMouseMove={MouseMove}
         tabIndex={0}
         onKeyDown={(e) => {
            if (e.key === "Enter") {
               nav(`/posts/${post.id}`);
            }
         }}
      >
         <div
            className={style.circle}
            style={{
               top: `${mousePosition.positionY - 300}px`,
               left: `${mousePosition.positionX - 300}px`,
            }}
         />
         <img src={post.smimg} className={style.post_photo} />
         <strong className={style.post_title}>{post.header}</strong>
         <p className={style.post_description}>{post.description}</p>
         <section className={style.info}>
            <CalendarIcon />
            <time dateTime={post.time}>{post.time}</time>
         </section>
      </article>
   );
});
