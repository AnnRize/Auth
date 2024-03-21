/* eslint-disable mobx/missing-observer */
import style from "./Error.module.scss";

export const Error = () => {
   return (
      <div className={style.error_message}>Error! Please try again later.</div>
   );
};
