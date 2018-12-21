export const SHOW_MESSAGE_ERROR = 'SHOW_MESSAGE_ERROR';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export function showMessage(type, message) {
  return dispatch => {
    console.log({ type, message });
    // dispatch({ type: SHOW_MESSAGE, props: {type, message} });
  };
}

export function removeMessage(index, type = 'errors') {
  return dispatch => {
    dispatch({ type: REMOVE_MESSAGE, props: { type, index } });
  };
}
