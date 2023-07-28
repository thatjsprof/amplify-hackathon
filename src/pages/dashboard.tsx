import { useStore } from "../store/store"

const Dashboard = () => {
    const [auth] = useStore((state) => [state.auth])

    console.log(auth)

    return <div>
        Dashboard
    </div>
}

export default Dashboard