import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { observer } from "mobx-react-lite";
import { Error, LoadSpinner } from "components";
import { UserService } from "api";
import { useStore } from "hooks";
import { ProfileContainer } from ".";

const Profile = observer(() => {
   const {
      userStore: { user },
   } = useStore();

   const { data, isLoading, isError } = useQuery(["profile"], async () => {
      const response = await UserService.GetUserById(user!.id);
      return response.data;
   });

   return (
      <>
         <Helmet>
            <title>Профиль</title>
         </Helmet>
         {isLoading && <LoadSpinner />}
         {isError && <Error />}
         {data && <ProfileContainer data={data} />}
      </>
   );
});

export default Profile;
