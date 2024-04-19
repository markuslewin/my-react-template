import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { ApiEndpoint } from "./pages/api-endpoint";
import { FormValidation } from "./pages/form-validation";
import { NestedRoutes } from "./pages/nested-routes";
import {
  NestedRoutesIndex,
  loader as nestedRoutesIndexLoader,
} from "./pages/nested-routes.index";
import {
  NestedRoutesCreate,
  action as nestedRoutesCreateAction,
} from "./pages/nested-routes.create";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        // loader: homeLoader,
        Component: Home,
      },
      {
        path: "api-endpoint",
        Component: ApiEndpoint,
      },
      {
        path: "form-validation",
        Component: FormValidation,
      },
      {
        path: "nested-routes",
        Component: NestedRoutes,
        children: [
          {
            index: true,
            loader: nestedRoutesIndexLoader,
            Component: NestedRoutesIndex,
          },
          {
            path: "create",
            action: nestedRoutesCreateAction,
            Component: NestedRoutesCreate,
          },
          // {
          //   path: "update/:id",
          //   action: nestedRoutesCreateAction,
          //   Component: NestedRoutesCreate,
          // },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
