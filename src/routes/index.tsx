import Tasks from "src/pages/tasks";
import Dashboard from "../pages/dashboard";
import Schedule from "src/pages/schedule";

const routes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "",
    element: <Tasks />,
  },
  {
    path: "tasks",
    element: <Tasks />,
  },
  {
    path: "schedule",
    element: <Schedule />,
  },
];

export default routes;
