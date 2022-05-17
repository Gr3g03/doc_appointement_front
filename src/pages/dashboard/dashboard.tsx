import FullCalendar, { DateSelectArg } from "@fullcalendar/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../main/components/Header/index";
import useGetUser from "../../main/hooks/useGetUser";
import "./dashboardd.css"
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import axios from "axios";
import { setDoc } from "../../main/store/stores/singleDoc/store.singleDoc";
import { useDispatch } from "react-redux";
import { setEvent } from "../../main/store/stores/event/event.store";
import { setUser } from "../../main/store/stores/user/user.store";
import { setModal } from "../../main/store/stores/modal/modal.store";
import Modals from "../../main/components/Modals";




const Dashboard: FC = () => {

  const user = useGetUser()
  const navigate = useNavigate()
  const [status, setStatus] = useState<any | null>(null)
  const [selectedDate, SetSelectedDate,] = useState<DateSelectArg | null>(null)


  const dispatch = useDispatch()

  console.log(user.acceptedAppointemets)


  const handleSubmit = async (e: any, project_id: any) => {
    const data = {
      status: e.target.value
    }
    const newData = await (await axios.put(`appointement/${project_id}`, data)).data;
    setStatus(newData)
    dispatch(setDoc(newData))

    if (newData === "delete") {

    }

  }

  const handleEvent = () => {
    if (user === null) return
    let INITIAL_EVENTS = []
    for (const element of user?.acceptedAppointemets) {
      console.log(element)
      const item = {
        start: element.start,
        end: element.end,
        title: element.title,
        description: element.description,
        status: element.status,
        allDay: false,
        className: "calendar__",
        overlap: false

      }
      INITIAL_EVENTS.push(item)
    }
    return INITIAL_EVENTS
  }

  const todayDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    const date = yyyy + "-" + mm + "-" + dd;
    return date;
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.changeView("timeGridDay", selectInfo.startStr);

    if (selectInfo.view.type === "timeGridDay") {
      SetSelectedDate(selectInfo);
      dispatch(setModal('appoinment'))
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if ((`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleDelte = async (id: any) => {
    const newData = await (await axios.delete(`deleteApp/${id}`)).data;
    if (!newData) {
      dispatch(setDoc(newData));
      dispatch(setUser(newData));
    }

  }
  let Final_event: any = handleEvent()


  useEffect(() => {
    if (!user.isDoctor) {
      navigate('/dashboard-user')
    }
    if (user.acceptedAppointemets.filter((event) => event.status.includes('pending')).length > 0) {
      alert(" you have a new appointemet")
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
            selectOverlap={true}
            displayEventEnd={true}
            weekends={false}
            height="750px"
            validRange={{ start: todayDate(), end: "2023-01-01" }}
          // select={handleDateSelect}
          // eventClick={handleEventClick}
          />

        </section>
        <section className="Doctor_left_section">

          <table className="table__" >
            <tbody>
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

                      <option >{data?.status}</option>
                      <option value="completed">completed</option>
                    </select> <button onClick={() => {
                      handleDelte(data.id);
                    }}>x</button>
                  </td>
                </tr>

              )}
            </tbody>
          </table>

          <h3>Notifications</h3>

        </section>


      </section>
      {/* <Modals selectedDate={selectedDate} /> */}

    </main>
  );
};

export default Dashboard;
