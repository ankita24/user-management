export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const SET_SELECTED_USERS = 'SET_SELECTED_USERS';

const initialState = {
  isLoading: false,
  list: [],
  selectedList: [],
  offset: 1,
  errors: {
    on: false,
    message: ''
  }
};

export default (state = initialState, { type, payload, error, offset }) => {
  switch (type) {
    case FETCH_USERS:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: payload
      };

    case FETCH_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error
      };

    case SET_SELECTED_USERS:
      return {
        ...state,
        selectedList: payload,
        offset: offset
      };

    default:
      return state;
  }
};
