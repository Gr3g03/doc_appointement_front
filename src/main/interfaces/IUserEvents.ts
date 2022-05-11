import IEvent from "./IEvent";

interface IUserEvents {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string
    phone: string
    userName: string
    bio: string
    password?: string
    avatar: string
    isDoctor: boolean
    postedAppointements: IEvent[]
    acceptedAppointemets: IEvent[]
}

export default IUserEvents;