import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const modalStore = createSlice({
  name: "modal",
  initialState: "",
  reducers: {
    setModal(_state, action: PayloadAction<string>) {
      return action.payload;
    },
    invalidateModal() {
      return "";
    },
  },
});

export default modalStore;

export const { setModal, invalidateModal } = modalStore.actions;
