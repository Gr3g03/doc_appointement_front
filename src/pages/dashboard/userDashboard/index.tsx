import { FC, useEffect, useState } from "react";
import Header from "../../../main/components/Header/index";
import "./index.css"
import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import axios from "axios";
import { EventInput, EventClickArg, EventApi, formatDate } from "@fullcalendar/react"
import DemoApp from "./calendar/DemoApp"
import useGetUser from "../../../main/hooks/useGetUser";
import IEvent from "../../../main/interfaces/IEvent";
import IUserEvent from "../../../main/interfaces/IEvent";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const UserDashboard: FC = () => {

    const theme = createTheme()


    const user = useGetUser()
    const [appointments, setAppointments] = useState<IEvent | null>(null)
    let todayStr = new Date().toISOString().replace(/T.*$/, '')

    const getappointments = async () => {
        const result = (await axios.get(`appointements`)).data
        console.log(result)
        setAppointments(result.data)
    }

    useEffect(() => {
        getappointments()
    }, [])


    let eventGuid = 0
    function createEventId() {
        return String(eventGuid++)
    }


    const handleDateSelect = (selectInfo: any) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId,
                startDate: selectInfo.startDate,
                endDate: selectInfo.endDate,
                title: selectInfo.title,
                description: selectInfo.description,
                status: selectInfo.status,
                user_id: selectInfo.user_id,
                doctor_id: selectInfo.doctor_id,
                allDay: false
            })
        }
    }

    const handleEvent = () => {
        const userEvents = user.postedAppointements

        const INITIAL_EVENTS = []
        for (const element of userEvents) {
            const items = {
                start: element.startDate,
                end: element.endDate,
                title: element.title,
                description: element.description,
                status: element.status,
                allDay: false
            }
            INITIAL_EVENTS.push(items)
        }
        return INITIAL_EVENTS
    }


    let Final_event: any = handleEvent()

    console.log(Final_event)


    const handleEventClick = (clickInfo: any) => {
        if ((`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }




    return (
        <main className="main_wrapper">
            <Header />
            <section className="user_main_dashboard">
                <section className="calendar_Section">
                    <h2>Book  Appointement</h2>

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
                        // initialEvents={Final_event} // alternatively, use the `events` setting to fetch from a feed
                        select={handleDateSelect}
                        // eventContent={renderEventContent} // custom render function
                        eventDurationEditable={true}
                        // weekends={newEvent.weekendsVisible}
                        eventClick={handleEventClick}
                    // eventsSet={handleEvents}



                    />



                    <DemoApp />
                </section>
                <section className="left_section">
                    <h3>booked Appointements</h3>
                </section>


            </section>


        </main>
    );
};

export default UserDashboard;
