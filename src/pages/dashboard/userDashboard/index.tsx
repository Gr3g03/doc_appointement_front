import { FC, useEffect, useState } from "react";
import Header from "../../../main/components/Header/index";
import "./index.css"
import FullCalendar, { DateSelectArg, EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import axios from "axios";
import Modals from "../../../main/components/Modals";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../main/store/stores/modal/modal.store";
import { RootState } from "../../../main/store/redux/rootState";
import { setDoc } from "../../../main/store/stores/singleDoc/store.singleDoc";
import useGetUser from "../../../main/hooks/useGetUser";
import IUser from "../../../main/interfaces/IUser"
import { toast } from "react-toastify";


const UserDashboard: FC = () => {

    const [dataFromServer, setDataFromServer] = useState<IUser[] | null>([])
    const [selectedDoc, setSelectedDoc] = useState<IUser | null>(null)
    const [selectedDate, SetSelectedDate,] = useState<DateSelectArg | null>(null)
    const [eventClick, setEventClick] = useState<EventClickArg>(null)
    const getDoctor = useSelector((_state: RootState) => _state.doc)
    const user = useGetUser()
    const dispatch = useDispatch()





    useEffect(() => {
        getDataFroServer()
    }, [])

    let docEvents = () => {
        if (selectedDoc === null) return <span>0</span>

        else {
            let docToShow = selectedDoc.acceptedAppointemets
            return docToShow.length
        }
    }


    async function getDataFroServer() {
        let result = await (await axios.get(`doctors`)).data;
        setDataFromServer(result)
    }

    const handleSelectedDoctor = (e: any) => {
        let copyOfDoctorcs = [...dataFromServer]
        let SelectedDoctor = copyOfDoctorcs.find(doctor => doctor.firstName === e.target.value && doctor.id !== user.id)
        dispatch(setDoc(SelectedDoctor))
        setSelectedDoc(SelectedDoctor)
    }

    const todayDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();

        const date = yyyy + "-" + mm + "-" + dd;
        return date;
    };


    const handleEvents = () => {
        if (getDoctor === null) return [];
        const returnedArray = [];
        for (const event of getDoctor.acceptedAppointemets) {
            let color = "";
            switch (event.status) {
                case "approved":
                    color = "#39c32f";
                    break;
                case "refused":
                    color = "#d01212";
                    break;
                case "other":
                    color = "#FF0000 ";
                    break;
                default:
                    color = "#FF0000";
            }

            const object = {
                title: event.title,
                id: `${event.id}`,
                start: event.start,
                end: event.end,
                allDay: false,
                editable: false,
                status: event.status,
                eventLimit: true,
                overlap: false,

                views: {
                    agenda: {
                        eventLimit: 1
                    }
                },
                backgroundColor: `${user.id === event.user_id ? color : "#849fb7"}`,
                selectOverlap: true,
                className: `${user.id !== event.user_id ? "others-color-events" : `${event.status}`
                    }`,
                eventRender: function (info: any) {
                    if (info.event.title) {
                        info._def.backgroundColor = "#FF0000";
                    }
                }

            };
            returnedArray.push(object);
        }

        return returnedArray;
    };


    let Final_event: any = handleEvents()

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        let calendarApi = selectInfo.view.calendar;
        calendarApi.changeView("timeGridDay", selectInfo.startStr);



        console.log(selectInfo)
        if (selectedDoc === null) {
            dispatch(setModal(''))
            toast.warning('please select a doctor')
        }

        else if (selectInfo.view.type === "timeGridDay") {
            SetSelectedDate(selectInfo);
            dispatch(setModal('appoinment'))
        }
    };


    const handleHover = () => {
        <div>test</div>
    }


    const handleEventClick = (eventClick: EventClickArg) => {
        setEventClick(eventClick)

        const getStatus = eventClick.event._def.extendedProps.status
        console.log(eventClick)

        if (getStatus.includes('completed')) {

            dispatch(setModal(''))
            toast.warning('cant edit a completed event')
        }

        else {
            dispatch(setModal('edit'))
        }

    }


    const busines = [
        {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '08:00',
            endTime: '18:00'
        }
    ]



    if (dataFromServer === null) return <h1></h1>
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
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',

                        }}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        events={Final_event}
                        displayEventEnd={true}
                        weekends={false}
                        eventDurationEditable={true}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        droppable={true}
                        validRange={{ start: todayDate(), end: "2023-01-01" }}
                        height="750px"
                        businessHours={busines}
                        slotLabelInterval={{ minutes: 10 }}
                        selectOverlap={true}
                        eventMouseEnter={handleHover}

                    />

                </section>
                <section className="left_section">
                    <h3>My Events</h3>

                    <table className="table__" >
                        <tbody>
                            <tr className="tr__">
                                <th >Day</th>
                                <th >Description</th>
                                <th >Status</th>
                            </tr>
                            {user.postedAppointements.map(data =>
                                //@ts-ignore
                                <tr className="tr__" key={data.id}>
                                    <td className="th__" >{data.start}</td>
                                    <td className="th__">{data.description}</td>
                                    <td className="th__ " >{data.status} </td>
                                </tr>
                            )}
                        </tbody>

                    </table>

                    <ul className="event-list">
                        <li>
                            <h4>

                                events <span> {docEvents()}  </span>
                            </h4>
                        </li>
                        <li className="event-list__item pending">
                            Pending
                            <span>
                                {
                                    user.postedAppointements.filter((event) =>
                                        event.status.includes('pending')
                                    ).length

                                }
                            </span>
                        </li>
                        <li className="event-list__item completed">
                            Approved
                            <span>
                                {
                                    user.postedAppointements.filter((event) =>
                                        event.status.includes("completed")
                                    ).length
                                }

                            </span>
                        </li>
                        <li className="event-list__item other">
                            Other
                            <span>
                                {
                                    getDoctor?.acceptedAppointemets.filter((event) =>
                                        event.user_id !== user.id
                                    ).length
                                }

                            </span>
                        </li>
                    </ul>
                </section>


            </section>
            <Modals selectedDate={selectedDate} eventClick={eventClick} setSelectedDoc={setSelectedDoc} />
        </main>

    );
};

export default UserDashboard;
