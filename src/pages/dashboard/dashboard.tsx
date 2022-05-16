import FullCalendar from "@fullcalendar/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../main/components/Header/index";
import useGetUser from "../../main/hooks/useGetUser";
import "./dashboardd.css"
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { setDoc } from "../../main/store/stores/singleDoc/store.singleDoc";
import { useDispatch } from "react-redux";
import IEvent from "../../main/interfaces/IEvent";



const Dashboard: FC = () => {

  const user = useGetUser()
  const navigate = useNavigate()


  const dispatch = useDispatch()
  const [status, setStatus] = useState<any | null>(null)

  const handleSubmit = async (e: any, project_id: any) => {
    const data = {
      status: e.target.value
    }
    const newData = await (await axios.put(`appointement/${project_id}`, data)).data;
    setStatus(newData)
    dispatch(setDoc(newData))

  }

  const handleEvent = () => {
    if (user === null) return
    let INITIAL_EVENTS = []
    for (const element of user?.acceptedAppointemets) {

      const item = {
        start: element.start,
        end: element.end,
        title: element.title,
        description: element.description,
        status: element.status,
        allDay: false,
        className: "calendar__",
      }
      INITIAL_EVENTS.push(item)
    }
    return INITIAL_EVENTS
  }


  console.log(status);


  const handleDelte = (id: any) => {
    const newList = status.filter((item: any) => item.id !== id)
    setStatus(newList)
  }

  let Final_event: any = handleEvent()


  useEffect(() => {
    if (!user.isDoctor) {
      navigate('/dashboard-user')
    }
  }, [])

  return (
    <main className="main_wrapper">
      <Header />

      <section className="user_main_dashboard">
        <section className="calendar_Section">
          <FullCalendar

            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={Final_event}
            droppable={true}
            eventDurationEditable={true}
          />

        </section>
        <section className="Doctor_left_section">

          <table className="table__" >
            <tr className="tr__">
              <th >Day</th>
              <th >Description</th>
              <th >Status</th>
            </tr>
            {user.acceptedAppointemets.map(data =>
              //@ts-ignore
              <tr className="tr__" key={data.id}>
                <td className="th__" >{data.start}</td>
                <td className="th__">{data.description}</td>
                <td className="th__" >
                  <select className="status_class" name="changeStatus" onChange={(e) => {
                    handleSubmit(e, data.id)
                  }} id="">

                    <option value="pending">{data?.status}</option>
                    <option value="active">active</option>
                    <option value="delete" onClick={() => {
                      handleDelte(data.id)
                    }}>delete</option>
                  </select>
                </td>
              </tr>
            )}
          </table>
        </section>


      </section>
    </main>
  );
};

export default Dashboard;
