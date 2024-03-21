import { Helmet } from "react-helmet-async";
import { observer } from "mobx-react-lite";
import { Error } from "components";
import { MyButton } from "interface";
import { UserList, UsersSkelet, useInfinityData } from ".";
import constants from "constants/Constants";
import style from "./Users.module.scss";

const Users = observer(() => {
   const {
      data,
      isLoading,
      isError,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
   } = useInfinityData();

   return (
      <>
         <Helmet>
            <title>Пользователи</title>
         </Helmet>
         <div className={style.users_container}>
            {isLoading && <UsersSkelet limit={constants.USERS_QUERY_LIMIT} />}
            {isError && <Error />}
            {data && (
               <>
                  <UserList pages={data.pages} pageParams={data.pageParams} />
                  {hasNextPage && (
                     <MyButton
                        className={style.load_more}
                        disabled={!hasNextPage || isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                     >
                        Загрузить ещё
                     </MyButton>
                  )}
               </>
            )}
         </div>
      </>
   );
});
export default Users;
