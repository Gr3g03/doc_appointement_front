import { FC, useEffect, useState } from "react";
import Header from "../../../main/components/Header/index";
import "./index.css"
import FullCalendar, { CalendarApi } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import axios from "axios";
import AppointementModal from "../../../main/components/Modals/appointment/Appointment";
import Modals from "../../../main/components/Modals";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../main/store/stores/modal/modal.store";
import IUser from "../../../main/interfaces/IUser";
import { RootState } from "../../../main/store/redux/rootState";
import { setDoc } from "../../../main/store/stores/singleDoc/store.singleDoc";



const UserDashboard: FC = () => {

    const [dataFromServer, setDataFromServer] = useState([])
    const [selectedDate, SetSelectedDate,] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        getDataFroServer()
    }, [])

    // console.log(selectedDate)

    async function getDataFroServer() {
        let result = await (await axios.get(`doctors`)).data;
        // console.log(result)
        setDataFromServer(result)
    }

    const handleSelectedDoctor = (e: any) => {
        let copyOfDoctorcs = [...dataFromServer]
        let SelectedDoctor = copyOfDoctorcs.find(doctor => doctor.firstName === e.target.value)
        dispatch(setDoc(SelectedDoctor))
    }

    const getDoctor = useSelector((_state: RootState) => _state.doc)


    const handleEvent = () => {
        if (getDoctor === null) return
        let INITIAL_EVENTS = []
        for (const element of getDoctor?.acceptedAppointemets) {

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

    let eventGuid = 0

    function createEventId() {
        return String(eventGuid++)
    }
    let Final_event: any = handleEvent()


    const handleDateSelect = (selectInfo: any) => {

        let calendarApi = selectInfo.view.calendar;
        calendarApi.changeView("timeGrid", selectInfo.startStr)

        console.log(selectInfo.startStr)


        if (getDoctor === null) {
            dispatch(setModal(''))
            alert("please selct a user")
        } else {

            dispatch(setModal('appoinment'))
        }
        SetSelectedDate(selectInfo)
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
            <Modals selectedDate={selectedDate} />
        </main>

    );
};

export default UserDashboard;
