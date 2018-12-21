export const SHOW_MESSAGE_ERROR = 'SHOW_MESSAGE_ERROR';
export const SHOW_MESSAGE_WARNING = 'SHOW_MESSAGE_WARNING';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';

export function showMessage(type, message) {
  return dispatch => {
    console.log({ type, message });
    switch (type) {
      case 'errors':
        dispatch({ type: SHOW_MESSAGE_ERROR, props: message });
        break;
      case 'warnings':
        dispatch({ type: SHOW_MESSAGE_WARNING, props: message });
        break;
      default:
        dispatch({
          type: SHOW_MESSAGE_ERROR,
          props: 'непонятный вызов ошибки',
        });
        break;
    }
  };
}

export function removeMessage(index, type = 'errors') {
  return dispatch => {
    dispatch({ type: REMOVE_MESSAGE, props: { type, index } });
  };
}
