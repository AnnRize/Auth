import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { observer } from "mobx-react-lite";
import { Error, LoadSpinner } from "components";
import { UserService } from "api";
import { UserProfile } from ".";

const User = observer(() => {
   const { id } = useParams();

   const { data, isLoading, isError } = useQuery(
      [`user`, id],
      async () => {
         const response = await UserService.GetUserById(Number(id));
         return response.data;
      },
      {
         retry: 0,
      },
   );

   return (
      <>
         <Helmet>
            <title>Пользователь - {data?.name || "unknown"}</title>
         </Helmet>
         {isLoading && <LoadSpinner />}
         {isError && <Error />}
         {data && <UserProfile data={data} />}
      </>
   );
});
export default User;
