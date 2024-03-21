// import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import { RootStoreProvider } from "contexts";
import { Router } from "./Router";
import { toasterStyle } from "utils";
import "./Global.scss";

const queryClient = new QueryClient({
   defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
   <QueryClientProvider client={queryClient}>
      <HelmetProvider>
         <RootStoreProvider>
            <Toaster position="bottom-left" toastOptions={toasterStyle} />
            <Router />
         </RootStoreProvider>
      </HelmetProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
   </QueryClientProvider>,
);
