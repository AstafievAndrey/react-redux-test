export const ADD_MEETING = 'ADD_MEETING';
export const ADD_SUCCESS_MEETING = 'ADD_SUCCESS_MEETING';
export const ADD_ERROR_MEETING = 'ADD_SUCCESS_MEETING';

export const UPDATE_MEETING = 'UPDATE_MEETING';
export const UPDATE_SUCCESS_MEETING = 'UPDATE_SUCCESS_MEETING';
export const UPDATE_ERROR_MEETING = 'UPDATE_ERROR_MEETING';

function emptyMembers(data) {
  data.members = data.members.filter(member => {
    return member.name !== '' && member.name !== undefined;
  });
  return data;
}

export function addMeeting(index, data) {
  return dispatch => {
    data = emptyMembers(data);
    dispatch({ type: ADD_MEETING });
    // dispatch({type: ADD_SUCCESS_MEETING, index, props: data});
    setTimeout(() => {
      dispatch({ type: ADD_SUCCESS_MEETING, index, props: data });
    }, 1000);
  };
}

export function updateMeeting(indexDay, indexMeeting, data) {
  return dispatch => {
    dispatch({ type: UPDATE_MEETING });
    data = emptyMembers(data);
    setTimeout(() => {
      dispatch({
        type: UPDATE_SUCCESS_MEETING,
        props: data,
        indexDay,
        indexMeeting,
      });
    }, 1000);
  };
}
