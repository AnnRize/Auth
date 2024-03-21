import "@testing-library/jest-dom";
// import { render, screen } from "@testing-library/react";
// import App from "../App";
// import Main from "../pages/Main/Main";
import { getAgeString } from "../utils/getAgeString";
import { getPageArray } from "../utils/getPageArray";
import { getPageCount } from "../utils/getPageCount";
import "intersection-observer";

// test("demo", () => {
//    expect(true).toBe(true);
// });

// test("Renders the main page", () => {
//    render(<App />);
//    expect(screen.getByTestId("label-test")).toBeInTheDocument();
// });

// test("Main button is disabled", () => {
//    render(<Main />);
//    expect(screen.getByTestId("test-button")).toBeDisabled();
// });

test("age to string", () => {
   expect(getAgeString(1)).toBe("1 год");
   expect(getAgeString(2)).toBe("2 года");
   expect(getAgeString(4)).toBe("4 года");
   expect(getAgeString(5)).toBe("5 лет");
   expect(getAgeString(20)).toBe("20 лет");
   expect(getAgeString(21)).toBe("21 год");
   expect(getAgeString(22)).toBe("22 года");
   expect(getAgeString(24)).toBe("24 года");
   expect(getAgeString(25)).toBe("25 лет");
   expect(getAgeString(30)).toBe("30 лет");
});

test("page array", () => {
   expect(getPageArray(10, 1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
   expect(getPageArray(4, 1)).toEqual([1, 2, 3, 4]);
   expect(getPageArray(1, 1)).toEqual([1]);
   expect(getPageArray(15, 6)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
   expect(getPageArray(15, 8)).toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
   expect(getPageArray(15, 10)).toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
   expect(getPageArray(15, 15)).toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
   expect(getPageArray(25, 18)).toEqual([
      14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
   ]);
});

test("page count", () => {
   expect(getPageCount(50, 5)).toBe(10);
   expect(getPageCount(53, 5)).toBe(11);
   expect(getPageCount(57, 5)).toBe(12);
});
