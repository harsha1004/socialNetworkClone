/* eslint-disable default-case */
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload]; // state = initialState olan state bu, yani hemen üstteki, ikinci parametre ile array'e yeni bir veri ekledik (bu durumda action.payload)
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload); // Return all alerts except the matching one
    default:
      return state;
  }
} // action will contain 2 things type and payload(data) Optional

// initialState'in içine aşağıdaki gibi objeler birikecek. O yüzden boş bir array oluşturduk.
// {
//     id: 1,
//     msg: 'Please log in',
//     alertType: 'success'
// }
