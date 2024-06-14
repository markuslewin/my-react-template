import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home, handle as homeHandle } from "./routes/home";
import { NestedRoutes } from "./routes/nested-routes";
import {
  NestedRoutesIndex,
  handle as nestedRoutesIndexHandle,
  action as nestedRoutesIndexAction,
  loader as nestedRoutesIndexLoader,
} from "./routes/nested-routes.index";
import {
  NestedRoutesCreate,
  handle as nestedRoutesCreateHandle,
  action as nestedRoutesCreateAction,
} from "./routes/nested-routes.create";
import {
  NestedRoutesUpdate,
  loader as nestedRoutesUpdateLoader,
  action as nestedRoutesUpdateAction,
  handle as nestedRoutesUpdateHandle,
} from "./routes/nested-routes.update.$id";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        handle: homeHandle,
        Component: Home,
      },
      {
        path: "nested-routes",
        Component: NestedRoutes,
        children: [
          {
            index: true,
            handle: nestedRoutesIndexHandle,
            loader: nestedRoutesIndexLoader,
            action: nestedRoutesIndexAction,
            Component: NestedRoutesIndex,
          },
          {
            path: "create",
            handle: nestedRoutesCreateHandle,
            action: nestedRoutesCreateAction,
            Component: NestedRoutesCreate,
          },
          {
            path: "update/:id",
            handle: nestedRoutesUpdateHandle,
            loader: nestedRoutesUpdateLoader,
            action: nestedRoutesUpdateAction,
            Component: NestedRoutesUpdate,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
