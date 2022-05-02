import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null, // This will take single profile information
  profiles: [], // This will take the list of profiles
  repos: [], // This will take github repos
  loading: true, // Bir istek yaptığımızda bunu false yapacağız
  error: {}, // Catch any error
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false, // Request is done
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false, // Request is done
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false, // Request is done
        profile: null, // Add this
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false, // Request is done
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false, // Request is done
      };
    default:
      return state;
  }
}
