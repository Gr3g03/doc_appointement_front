import { combineReducers } from "@reduxjs/toolkit";
import userStore from "../stores/user/user.store";
import navigationStore from "../stores/navigation/navigation.store";
import modalStore from "../stores/modal/modal.store";

const rootReducer = combineReducers({
  user: userStore.reducer,
  navigation: navigationStore.reducer,
  modal: modalStore.reducer,
});

export default rootReducer;
