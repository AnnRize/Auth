import _ from "lodash";

export function getPageArray(totalPages: number, page: number) {
   if (totalPages > 10) {
      if (page > 5 && page < totalPages - 5) {
         return [..._.range(page - 4, page), ..._.range(page, page + 6)];
      }
      if (page <= 5) {
         return _.range(1, 11);
      }
      if (page >= totalPages - 5) {
         return _.range(totalPages - 9, totalPages + 1);
      }
   }
   if (totalPages <= 10) {
      return _.range(1, totalPages + 1);
   }
}
