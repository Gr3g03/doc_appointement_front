import { FC, useEffect, useState } from "react";
import Header from "../../../main/components/Header/index";
import "./index.css"
import FullCalendar, { DateSelectArg, EventClickArg } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
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
import React from "react";


const UserDashboard: FC = () => {

    const [dataFromServer, setDataFromServer] = useState<IUser[] | null>([])
    const [selectedDoc, setSelectedDoc] = useState<IUser | null>(null)
    const [selectedDate, SetSelectedDate,] = useState<DateSelectArg | null>(null)
    const [eventClick, setEventClick] = useState<EventClickArg>(null)
    const getDoctor = useSelector((_state: RootState) => _state.doc)
    const user = useGetUser()
    const dispatch = useDispatch()
    const calendarRef = React.createRef();

    useEffect(() => {
        getDataFroServer()
    }, [])



    const event = useSelector((_state: RootState) => _state.event)

    // console.log(event[1])


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

    // const handleEvent = () => {
    //     if (getDoctor === null) return []
    //     let INITIAL_EVENTS = []

    //     for (const element of getDoctor.acceptedAppointemets) {

    //         let color = "";
    //         switch (element.status) {
    //             case "confirmed":
    //                 color = "#39c32f";
    //                 break;
    //             case "pending":
    //                 color = "#d01212";
    //                 break;
    //             default:
    //                 color = "#fc9605";

    //         }
    //         const item = {
    //             id: `${element.id}`,
    //             start: element.start,
    //             end: element.end,
    //             title: element.title,
    //             description: element.description,
    //             status: element.status,
    //             allDay: false,
    //             className: `${user.id === element.user_id ? "colors" : `${element.status}`
    //                 }`,
    //             backgroundColor: `${user.id === element.user_id ? color : "#FA1F1F"}`,
    //             overlap: true,



    //         }

    //         INITIAL_EVENTS.push(item)
    //     }
    //     return INITIAL_EVENTS
    // }


    const handleEvents = () => {
        if (selectedDoc === null) return [];
        const returnedArray = [];
        for (const event of selectedDoc.acceptedAppointemets) {
            let color = "";
            switch (event.status) {
                case "approved":
                    color = "#39c32f";
                    break;
                case "refused":
                    color = "#d01212";
                    break;
                default:
                    color = "#fc9605";
            }

            const object = {
                title: event.title,
                id: `${event.id}`,
                start: event.start,
                end: event.end,
                allDay: false,
                editable: false,
                backgroundColor: `${user.id === event.user_id ? color : "#849fb7"}`,
                overlap: false,
                className: `${user.id !== event.user_id ? "others-color-events" : `${event.status}`
                    }`,
            };
            returnedArray.push(object);
        }
        return returnedArray;
    };

    let Final_event: any = handleEvents()
    // console.log(Final_event)

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        let calendarApi = selectInfo.view.calendar;
        calendarApi.changeView("timeGridDay", selectInfo.startStr);

        if (selectInfo.view.type === "timeGridDay") {
            SetSelectedDate(selectInfo);
            dispatch(setModal('appoinment'))
        }
    };

    const handleEventClick = (eventClick: EventClickArg) => {
        setEventClick(eventClick)
        dispatch(setModal('edit'))

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
                        // weekends={false}
                        eventDurationEditable={true}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        droppable={true}
                        validRange={{ start: todayDate(), end: "2023-01-01" }}
                        height="750px"
                        businessHours={busines}
                        slotDuration={{ minutes: 60 }}
                        slotLabelInterval={{ minutes: 10 }}
                        selectOverlap={() => {
                            //@ts-ignore
                            let calendarApi = calendarRef.current.getApi();
                            if (calendarApi.view.type === "timeGridDay") {
                                return false;
                            }
                            return true;
                        }}
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
                            {user.postedAppointements.map((data) =>
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
                                        event.status.includes("pending")
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
                    </ul>
                </section>


            </section>
            <Modals selectedDate={selectedDate} eventClick={eventClick} setSelectedDoc={setSelectedDoc} />
        </main>

    );
};

export default UserDashboard;
