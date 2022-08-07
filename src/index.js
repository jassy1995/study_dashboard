import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import Spinner from "components/Spinner";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});

ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={<Spinner />}>
          <App />
        </React.Suspense>
      </QueryClientProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

reportWebVitals();

