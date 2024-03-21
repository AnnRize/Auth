// /* eslint-disable mobx/missing-observer */
// import { useEffect, useState } from "react";
// import axios from "axios";

// const AccessTokenTest = () => {
//    const [/* isLogged */, setIsLogged] = useState();

//    const queryReg = async () => {
//       const response = await axios.post(`http://localhost:4300/register`, {
//          email: "add@add5.com",
//          password: "55555",
//       });
//       console.log("Вы вошли");
//       console.log(response);
//    };

//    const queryLog = async () => {
//       const response = await axios.post(`http://localhost:4300/login`, {
//          email: "add@add5.com",
//          password: "55555",
//       });
//       console.log(response);
//       document.cookie = `ID=${response.data.user.id}`;
//       localStorage.setItem("token", response.data.accessToken);
//    };

//    const profileIn = async () => {
//       /* const response = await axios.get(`http://localhost:4200/users/1`, {
//          headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//          },
//       }); */
//       try {
//          const response = await axios.get(`http://localhost:4300/messages`, {
//             headers: {
//                Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//          });
//          console.log(response);
//          console.log("Вы вошли в профиль");
//       } catch (error) {
//          console.log(error.response);
//          console.log(error.message);
//       }
//    };

//    const queryLogOut = async () => {
//       if (localStorage.getItem("token")) {
//          localStorage.removeItem("token");
//          console.log("Вы вышли");
//       } else {
//          console.log("Вы уже вышли");
//       }
//    };

//    useEffect(() => {
//       const isLogged = async () => {
//          const token = localStorage.getItem("token");

//          if (token) {
//             const res = await axios.get(`http://localhost:4300/messages`, {
//                headers: {
//                   Authorization: `Bearer ${localStorage.getItem("token")}`,
//                },
//             });
//             setIsLogged(true);
//             console.log(res);
//             console.log("Вы залогинены");
//          } else {
//             setIsLogged(false);
//             console.log("Вы не залогинены");
//             console.log("Перенаправляем в /login");
//          }

//          /* console.log(response);
//          console.log("Вы вошли в профиль"); */
//       };

//       isLogged();
//    }, []);

//    return (
//       <>
//          <button onClick={queryReg}>зарегистрировать</button>
//          <button onClick={queryLog}>залогинить</button>
//          <button onClick={profileIn}>Профиль пользователя</button>
//          <button onClick={queryLogOut}>выйти</button>
//       </>
//    );
// };

// export default AccessTokenTest;
