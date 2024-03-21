import { Dispatch, FC, ReactNode } from "react";
import { observer } from "mobx-react-lite";
import style from "./Modal.module.scss";

interface IModal {
   setActive: Dispatch<boolean>;
   active: boolean | (() => boolean);
   children: ReactNode;
}

export const Modal: FC<IModal> = observer(({ children, active, setActive }) => {
   return (
      active && (
         <div className={style.modal} onMouseDown={() => setActive(false)}>
            <div
               className={style.modal__content}
               onMouseDown={(e) => e.stopPropagation()}
            >
               {children}
            </div>
         </div>
      )
   );
});
