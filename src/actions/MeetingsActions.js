export const ADD_MEETING = 'ADD_MEETING';
export const ADD_SUCCESS_MEETING = 'ADD_SUCCESS_MEETING';
export const ADD_ERROR_MEETING = 'ADD_SUCCESS_MEETING';

export function addMeeting(index, data) {
  return dispatch => {
    dispatch({ type: ADD_MEETING });
    // dispatch({type: ADD_SUCCESS_MEETING, index, props: data});
    setTimeout(() => {
      dispatch({ type: ADD_SUCCESS_MEETING, index, props: data });
    }, 1000);
  };
}
