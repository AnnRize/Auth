/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { isUndefined } from "lodash";
import { EditButtons, Error, LoadSpinner, Modal, Pagination } from "components";
import { AddPost, DeletePost, PostTable, UpdatePost } from ".";
import { usePosts, useStore } from "hooks";
import constants from "constants/Constants";

const DashboardPosts = observer(() => {
   const [searchParams] = useSearchParams();
   const page = Number(searchParams.get("page")) || 1;
   const [sort, setSorts] = useState("byDateAdded");
   const [order, setOrder] = useState("asc");
   const [modalActive, setModalActive] = useState(false);
   const {
      dashboardDataStore: { mode, fullReset },
   } = useStore();

   // get posts query
   const { data, isLoading, isError, totalPages, refetch } = usePosts(
      "post_data",
      page,
      constants.DASHBOARD_POSTS_QUERY_LIMIT,
      sort,
      order,
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
   }, [page, sort, order, refetch]);

   return (
      <>
         {isLoading && <LoadSpinner />}
         {isError && <Error />}
         {!isUndefined(data) && data.length > 0 && (
            <>
               <EditButtons setModalActive={setModalActive} />
               <PostTable
                  orderSwap={orderSwap}
                  setSorts={setSorts}
                  data={data}
               />
               <Pagination totalPages={totalPages} page={page} />

               <Modal active={modalActive} setActive={setModalActive}>
                  {mode === 1 && <AddPost setModalActive={setModalActive} />}
                  {mode === 2 && <UpdatePost setModalActive={setModalActive} />}
                  {mode === 3 && <DeletePost setModalActive={setModalActive} />}
               </Modal>
            </>
         )}
      </>
   );
});

export default DashboardPosts;
