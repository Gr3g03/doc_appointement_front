interface IUser {
  id?: number;
  fullName: string;
  email: string;
  password?: string;
  isDoctor: boolean;
}

export default IUser;
