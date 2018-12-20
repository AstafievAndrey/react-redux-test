export const SHOW_MESSAGE = 'SHOW_MESSAGE';

export function showMessage(msgs) {
  return dispatch => {
    console.log(msgs);
    dispatch({ type: SHOW_MESSAGE });
  };
}
