import {
  FETCH_USERS,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
  SET_SELECTED_USERS
} from '../reducers/user';

import { getUser } from '../api';

export const fetchUser = () => {
  return dispatch => {
    dispatch({
      type: FETCH_USERS
    });

    return getUser()
      .then(payload => {
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_USERS_ERROR,
          error: 'Unable to fetch'
        });
      });
  };
};

const limit = 5;

export const setSelectedUsers = (offset = 1) => {
  return (dispatch, getState) => {
    const { users: { list } = {} } = getState();

    const payload = list.slice((offset - 1) * limit, offset * limit);

    return Promise.resolve(
      dispatch({
        type: SET_SELECTED_USERS,
        payload,
        offset
      })
    );
  };
};
