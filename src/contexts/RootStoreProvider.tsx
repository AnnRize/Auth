/* eslint-disable mobx/missing-observer */
import { ReactNode, createContext } from "react";
import { RootStore } from "store/root-store";

interface RootStoreProviderProps {
   children: ReactNode;
}

export const RootStoreContext = createContext<typeof RootStore | null>(null);

export const RootStoreProvider = ({ children }: RootStoreProviderProps) => {
   return (
      <RootStoreContext.Provider value={RootStore}>
         {children}
      </RootStoreContext.Provider>
   );
};
