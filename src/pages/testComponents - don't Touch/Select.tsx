// /* eslint-disable mobx/missing-observer */
// import "./Select.scss";
// import { useState } from "react";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";

// const options = [
//    {
//       value: "korea",
//       label: "Korea",
//    },
//    {
//       value: "russia",
//       label: "Russia",
//    },
//    {
//       value: "usa",
//       label: "USA",
//    },
//    {
//       value: "germany",
//       label: "Germany",
//    },
// ];

// // const isMulti = true;

// const animatedComponents = makeAnimated();

// const SelectPage = () => {
//    const [currentCountry, setCurrentCountry] = useState("");
//    const [currentCountries, setCurrentCountries] = useState([]);

//    const soloGetValue = () => {
//       return currentCountry
//          ? options.find((c) => c.value === currentCountry)
//          : "";
//    };

//    const soloOnChange = (newValue) => {
//       console.log(newValue);
//       setCurrentCountry(newValue.value);
//    };

//    const multiGetValue = () => {
//       return currentCountries
//          ? options.filter((c) => currentCountries.indexOf(c.value) >= 0)
//          : [""];
//    };

//    const multiOnChange = (newValue) => {
//       console.log(newValue.map((v) => v.value));
//       setCurrentCountries(newValue.map((v) => v.value));
//    };

//    return (
//       <div className="main">
//          <h1>SOLO SELECT</h1>
//          <Select
//             onChange={soloOnChange}
//             value={soloGetValue()}
//             options={options}
//          />

//          <h1>MULTI SELECT</h1>
//          <Select
//             classNamePrefix="custom-select"
//             isSearchable
//             components={animatedComponents}
//             onChange={multiOnChange}
//             value={multiGetValue()}
//             options={options}
//             isMulti
//          />
//       </div>
//    );
// };
// export default SelectPage;
