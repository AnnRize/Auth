/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { observer } from "mobx-react-lite";
import { isUndefined } from "lodash";
import { EditButtons, Error, LoadSpinner, Modal, Pagination } from "components";
import { getPageCount } from "utils";
import { AddUser, DeleteUser, UpdateUser, UsersTable } from ".";
import { UserService } from "api";
import { useStore } from "hooks";
import constants from "constants/Constants";
import { IUsersSort } from "types";

const DashboardUsers = observer(() => {
   const [searchParams] = useSearchParams();
   const [totalPages, setTotalPages] = useState(0);
   const page = Number(searchParams.get("page")) || 1;
   const [sort, setSorts] = useState<IUsersSort>("id");
   const [order, setOrder] = useState<"desc" | "asc">("desc");
   const [modalActive, setModalActive] = useState(false);

   const {
      dashboardDataStore: { mode, fullReset },
   } = useStore();

   // get users query
   const { data, isLoading, error, refetch } = useQuery(
      ["users_data"],
      async () => {
         const response = await UserService.GetUsers(
            page,
            constants.DASHBOARD_USERS_QUERY_LIMIT,
            sort,
            order,
         );
         setTotalPages(
            getPageCount(
               response.headers["x-total-count"],
               constants.DASHBOARD_USERS_QUERY_LIMIT,
            ),
         );
         return response.data;
      },
   );

   const orderSwap = () => {
      setOrder((e) => {
         return e === "desc" ? "asc" : "desc";
      });
   };

   useEffect(() => {
      refetch();
      return () => {
         fullReset();
      };
   }, [page, order]);

   return (
      <>
         {isLoading && <LoadSpinner />}
         {error && <Error />}
         {!isUndefined(data) && data.length > 0 && (
            <>
               <EditButtons setModalActive={setModalActive} />
               <UsersTable
                  orderSwap={orderSwap}
                  setSorts={setSorts}
                  data={data}
               />

               <Pagination totalPages={totalPages} page={page} />

               <Modal active={modalActive} setActive={setModalActive}>
                  {mode === 1 && <AddUser setModalActive={setModalActive} />}
                  {mode === 2 && <UpdateUser setModalActive={setModalActive} />}
                  {mode === 3 && <DeleteUser setModalActive={setModalActive} />}
               </Modal>
            </>
         )}
      </>
   );
});

export default DashboardUsers;
