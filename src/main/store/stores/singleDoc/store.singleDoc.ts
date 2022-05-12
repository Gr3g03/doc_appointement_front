import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from "../../../interfaces/IUser"

const docStore = createSlice({
    name: 'doc',
    initialState: null as IUser,
    reducers: {
        setDoc(_state, action: PayloadAction<IUser>) {
            return { ...action.payload };
        }
    },
});

export default docStore;

export const { setDoc } = docStore.actions;


