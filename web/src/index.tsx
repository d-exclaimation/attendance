import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "react-query";
import App from "./App";
import { queryClient } from "./graphql/client";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
