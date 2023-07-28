import { useNavigate } from "react-router-dom";
import { logout } from "src/services/auth";
import NavBarHeader from "src/ui-components/NavBarHeader";

interface ILinkConfig {
  onClick: () => void;
}

type TRoutes = "dashboard" | "schedule" | "tasks";

const linksConfig = ({ onClick }: ILinkConfig) => ({
  style: {
    cursor: "pointer",
  },
  onClick,
});

const Header = () => {
  const navigate = useNavigate();

  const routeToPage = (route: TRoutes) => {
    navigate(route);
  };

  return (
    <NavBarHeader
      width="100%"
      overrides={{
        Dashboard: {
          ...linksConfig({
            onClick: () => routeToPage("dashboard"),
          }),
        },
        Schedule: {
          ...linksConfig({
            onClick: () => routeToPage("schedule"),
          }),
        },
        Tasks: {
          ...linksConfig({
            onClick: () => routeToPage("tasks"),
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
