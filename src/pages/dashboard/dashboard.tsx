import FullCalendar from "@fullcalendar/react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../main/components/Header/index";
import useGetUser from "../../main/hooks/useGetUser";
import "./dashboardd.css"
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import axios from "axios";


const Dashboard: FC = () => {

  const user = useGetUser()
  const navigate = useNavigate()

  const handleEvent = () => {
    if (user === null) return
    let INITIAL_EVENTS = []
    for (const element of user?.acceptedAppointemets) {

      const item = {
        start: element.startDate,
        end: element.endDate,
        title: element.title,
        description: element.description,
        status: element.status,
        allDay: false,
        className: "calendar__",
        textColor: "red"
      }
      INITIAL_EVENTS.push(item)
    }
    return INITIAL_EVENTS
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
            // select={handleDateSelect}
            eventDurationEditable={true}
            // eventClick={handleEventClick}
            droppable={true}


          />

        </section>
        <section className="left_section">
          <h3>booked Appointements</h3>
        </section>


      </section>
    </main>
  );
};

export default Dashboard;
