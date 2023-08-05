import { Navigate, useRoutes } from "react-router-dom";
import PublicLayout from "../layout/index";
import Homepage from "../pages/Homepage/Homepage";
import Lists from "../pages/Lists/Lists";
import Player from "../pages/Player/Player";

const routes = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: "home",
        element: <Homepage />,
      },
      {
        path: "Lists",
        element: <Lists />,
      },
      {
        path: "Player/:id",
        element: <Player />,
      }
    ],
  }
];
const Router = () => {
  return useRoutes(routes);
};

export default Router;