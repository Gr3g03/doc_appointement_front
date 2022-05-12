import { combineReducers } from "@reduxjs/toolkit";
import userStore from "../stores/user/user.store";
import navigationStore from "../stores/navigation/navigation.store";
import modalStore from "../stores/modal/modal.store";
import eventStore from "../stores/event/event.store"
import docStore from "../stores/singleDoc/store.singleDoc"

const rootReducer = combineReducers({
  user: userStore.reducer,
  navigation: navigationStore.reducer,
  modal: modalStore.reducer,
  event: eventStore.reducer,
  doc: docStore.reducer
});

export default rootReducer;
