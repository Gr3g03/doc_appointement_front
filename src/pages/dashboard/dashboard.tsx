import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../main/components/Header/index";
import useGetUser from "../../main/hooks/useGetUser";
import "./dashboard.css"


const Dashboard: FC = () => {

  const user = useGetUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.isDoctor) {
      navigate('/dashboard-user')
    }
  }, [])
  return (
    <main className="dashboard_main_wrapper">
      <Header />
      <section className="doctor_main_dashboard">



      </section>


      <h2>Doctor Dashboard</h2>
    </main>
  );
};

export default Dashboard;
