import { FC, useEffect, useState } from "react";
import Header from "../../../main/components/Header/index";
import "./index.css"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import axios from "axios";
import useGetUser from "../../../main/hooks/useGetUser";
import IEvent from "../../../main/interfaces/IEvent";
import AppointementModal from "../../../main/components/Modals/appointment/Appointment";
import Modals from "../../../main/components/Modals";
import { useDispatch } from "react-redux";
import { setModal } from "../../../main/store/stores/modal/modal.store";
import { useParams } from "react-router-dom";
import IUserEvents from "../../../main/interfaces/IUserEvents";
import IUser from "../../../main/interfaces/IUser";
import { Calendar } from "@fullcalendar/core";




const UserDashboard: FC = () => {

    const [dataFromServer, setDataFromServer] = useState([])
    const [singleDoc, setSingleDoc] = useState<IUser>(null)
    const dispatch = useDispatch()



    useEffect(() => {
        getDataFroServer()
    }, [])

    async function getDataFroServer() {
        let result = await (await axios.get(`doctors`)).data;
        setDataFromServer(result)
    }


    const handleSelectedDoctor = (e: any) => {
        const copyOfDoctorcs = [...dataFromServer]
        const SelectedDoctor = copyOfDoctorcs.find(doctor => doctor.firstName === e.target.value)
        setSingleDoc(SelectedDoctor)
    }


    const handleEvent = () => {

        if (singleDoc === null) return []
        const INITIAL_EVENTS = []
        for (const element of singleDoc?.acceptedAppointemets) {
            const items = {
                start: element.startDate,
                end: element.endDate,
                title: element.title,
                description: element.description,
                status: element.status,
                allDay: false,
                className: "calendar__",
                textColor: "red"
            }
            INITIAL_EVENTS.push(items)
        }
        return INITIAL_EVENTS
    }
    let eventGuid = 0
    function createEventId() {
        return String(eventGuid++)
    }
    let Final_event: any = handleEvent()

    const handleDateSelect = (selectInfo: any) => {
        dispatch(setModal('appoinment'))
        let title = ('Please enter a new title for your event')
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
                    <select className="DoctorSelect" defaultValue={'DEFAULT'}
                        onChange={(e) => {
                            handleSelectedDoctor(e)
                        }}
                    >
                        <option value="DEFAULT" disabled> Select Doctor</option>
                        {dataFromServer.map(item =>
                            <option key={item.id}  >{item.firstName}</option>
                        )}
                    </select>

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
                        select={handleDateSelect}
                        eventDurationEditable={true}
                        eventClick={handleEventClick}
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

export default UserDashboard;
