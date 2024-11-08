import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Registration, Dashboard, Error } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FormProvider } from "./store/FormContext";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormProvider>
      <RouterProvider router={router} />
    </FormProvider>
  </StrictMode>,
);
