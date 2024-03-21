import { Dispatch } from "react";
import { observer } from "mobx-react-lite";
import { MyButton } from "interface";
import { useStore } from "hooks";
import style from "./EditButtons.module.scss";

interface EditButtonsProps {
   setModalActive: Dispatch<boolean>;
}

export const EditButtons = observer(({ setModalActive }: EditButtonsProps) => {
   const {
      dashboardDataStore: { editMode, setMode, fullReset },
   } = useStore();

   return (
      <>
         <section className={style.edit_buttons}>
            <MyButton
               onClick={() => {
                  setMode(1);
                  setModalActive(true);
               }}
            >
               Добавить
            </MyButton>
            {editMode && (
               <>
                  <MyButton
                     onClick={() => {
                        setMode(2);
                        setModalActive(true);
                     }}
                  >
                     Изменить
                  </MyButton>
                  <MyButton
                     onClick={() => {
                        setMode(3);
                        setModalActive(true);
                     }}
                  >
                     Удалить
                  </MyButton>
                  <MyButton
                     onClick={() => {
                        fullReset();
                     }}
                  >
                     Отмена
                  </MyButton>
               </>
            )}
         </section>
      </>
   );
});
