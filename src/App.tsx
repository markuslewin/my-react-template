import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { ApiEndpoint } from "./pages/api-endpoint";
import { FormValidation } from "./pages/form-validation";

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
      // {
      //   path: "todos",
      //   action: todosAction,
      //   loader: todosLoader,
      //   Component: TodosList,
      //   ErrorBoundary: TodosBoundary,
      //   children: [
      //     {
      //       path: ":id",
      //       loader: todoLoader,
      //       Component: Todo,
      //     },
      //   ],
      // },
      // {
      //   path: "deferred",
      //   loader: deferredLoader,
      //   Component: DeferredPage,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
