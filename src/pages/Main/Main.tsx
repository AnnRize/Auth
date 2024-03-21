import { Helmet } from "react-helmet-async";
import { observer } from "mobx-react-lite";
import { Parallax, Time } from ".";

const Main = observer(() => {
   return (
      <>
         <Helmet>
            <title>Главная</title>
         </Helmet>
         <Parallax />
         <Time />
      </>
   );
});

export default Main;
