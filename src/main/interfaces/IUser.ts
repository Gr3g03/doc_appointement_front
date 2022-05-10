interface IUser {
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
}

export default IUser;