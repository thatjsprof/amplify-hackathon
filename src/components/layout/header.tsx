import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "src/services/auth";
import NavBarHeader from "src/ui-components/NavBarHeader";

interface ILinkConfig {
  onClick: () => void;
  active: boolean;
}

type TRoutes = "dashboard" | "schedule" | "tasks";

const linksConfig = ({ onClick, active }: ILinkConfig) => {
  return {
    style: {
      cursor: "pointer",
      color: active ? "hsl(30, 50%, 50%)!important" : "inherit",
    },
    onClick,
  };
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeToPage = (route: TRoutes) => {
    navigate(route);
  };

  const pathname = location.pathname;

  const existsInRoute = (path: string) => pathname.includes(path);

  return (
    <NavBarHeader
      width="100%"
      overrides={{
        Schedule: {
          ...linksConfig({
            onClick: () => routeToPage("schedule"),
            active: existsInRoute("/schedule"),
          }),
        },
        Tasks: {
          ...linksConfig({
            onClick: () => routeToPage("tasks"),
            active: existsInRoute("/tasks"),
          }),
        },
        Button: {
          onClick: async () => {
            await logout();
            navigate("/");
          },
        },
      }}
    />
  );
};

export default Header;
