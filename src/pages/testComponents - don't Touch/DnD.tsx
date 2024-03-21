/* eslint-disable mobx/missing-observer */
import { useState } from "react";
import style from "./DnD.module.scss";
import { Reorder } from "framer-motion";

export const DnD = () => {
   const [order, setOrder] = useState([1, 2, 3, 4, 5]);

   return (
      <Reorder.Group as="ol" axis="y" onReorder={setOrder} values={order}>
         {order.map((e) => (
            <Reorder.Item key={e} value={e}>
               <div className={style.item}>item {e}</div>
            </Reorder.Item>
         ))}
      </Reorder.Group>
   );
};
