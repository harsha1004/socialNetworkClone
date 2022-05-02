import { v4 as uuidv4 } from 'uuid'; // This package gives us a unique id
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4(); // created unique id
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
