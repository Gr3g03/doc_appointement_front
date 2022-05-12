import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IEvent from '../../../interfaces/IEvent';
const eventStore = createSlice({
    name: 'event',
    initialState: null as IEvent,
    reducers: {
        setEvent(_state, action: PayloadAction<IEvent>) {
            return { ...action.payload };
        }
    },
});

export default eventStore;

export const { setEvent } = eventStore.actions;
