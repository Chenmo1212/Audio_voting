import { Navigate, useRoutes } from "react-router-dom";
import PublicLayout from "../layout/index";
import Homepage from "../pages/Homepage/Homepage";
import Lists from "../pages/Lists/Lists";
import PlayerList from "../pages/PlayerList/PlayerList";

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
        path: "PlayerList/:id",
        element: <PlayerList />,
      }
    ],
  }
];
const Router = () => {
  return useRoutes(routes);
};

export default Router;