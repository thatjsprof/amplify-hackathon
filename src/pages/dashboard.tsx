import { useStore } from "../store/store";

const Dashboard = () => {
  const [auth] = useStore((state) => [state.user]);

  console.log(auth);

  return <div>Dashboard</div>;
};

export default Dashboard;
