import { StylesConfig } from "react-select";
import { IPostOption } from "types/selectPostOption";

export const customSelect: StylesConfig<IPostOption> = {
   container: (baseStyles) => ({
      ...baseStyles,
      marginRight: "20px",
   }),
   control: (baseStyles) => ({
      ...baseStyles,
      border: "var(--border)",
      boxShadow: "none",
      "&:hover": {
         cursor: "pointer",
      },
      borderRadius: "10px",
      background: "var(--backgroundColor)",
      transition: "none",
   }),
   indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      width: "2px",
      background: "var(--textColor)",
      margin: "0",
   }),
   dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      color: "var(--textColor)",
      "&:hover": {
         color: "var(--colorHover)",
      },
   }),
   menu: (baseStyles) => ({
      ...baseStyles,
      border: "var(--border)",
      background: "var(--backgroundColor)",
      borderRadius: "10px",
      overflow: "hidden",
      // margin: "0",
   }),
   menuList: (baseStyles) => ({
      ...baseStyles,
      padding: "0",
   }),
   singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "var(--textColor)",
      fontSize: "1.5rem",
      margin: "0",
      padding: "8px 12px 8px 4px",
   }),
   option: (baseStyles, state) => ({
      ...baseStyles,
      color: "var(--textColor)",
      fontSize: "1.5rem",
      backgroundColor:
         state.isSelected || state.isFocused
            ? "var(--backgroundHover)"
            : "var(--backgroundColor)",
      "&:hover": {
         backgroundColor: "var(--backgroundHover)",
         cursor: "pointer",
      },
      // backgroundColor: state.isFocused && "var(--backgroundHover)",
   }),
};
