import React, { useReducer } from "react";
import { v5 as uuid } from 'uuid';
import NotificationContext from "./notificationContext";
import notificationReducer from "./notificationReducer";
import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from "../types";

const NotificationState = props => {
  const initialState = [];
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Set Notification
  const setNotification = (msg, type, timeout = 5000) => {
    const _id = uuid.v4();
    dispatch({
      type: SET_NOTIFICATION,
      payload: { msg, type, _id }
    });

    setTimeout(
      () => dispatch({ type: REMOVE_NOTIFICATION, payload: _id }),
      timeout
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: state,
        setNotification
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
