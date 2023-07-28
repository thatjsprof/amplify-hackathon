import { useNavigate } from 'react-router-dom';
import NavBarHeader from 'src/ui-components/NavBarHeader';

interface ILinkConfig {
    onClick: () => void
}

type TRoutes = "dashboard" | "schedule" | "tasks"

const linksConfig = ({ onClick }: ILinkConfig) => ({
    style: {
        cursor: "pointer",
    },
    onClick
})

const Header = () => {
    const navigate = useNavigate()

    const routeToPage = (route: TRoutes) => {
        navigate(route)
    }

    return <NavBarHeader width="100%" overrides={{
        Dashboard: {
            // as: 'a',
            ...linksConfig({
                onClick: () => routeToPage('dashboard')
            })
        },
        Schedule: {
            // as: 'a',
            ...linksConfig({
                onClick: () => routeToPage('schedule')
            })
        },
        Tasks: {
            // as: 'a',
            ...linksConfig({
                onClick: () => routeToPage('tasks')
            })
        }
    }} />
}

export default Header

