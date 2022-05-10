import { FC } from "react";
import Header from "../../main/components/Header";
import useGetUser from "../../main/hooks/useGetUser";


const Dashboard: FC = () => {

  const user = useGetUser()

  console.log(user)

  return (
    <>
      <Header />

      <h2>Doctor Dashboard</h2>
    </>
  );
};

export default Dashboard;
