import { SHOW_MESSAGE } from '../actions/MessagesActions';
const initialState = [];

export function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
      console.log(SHOW_MESSAGE, state, action);
      break;
    default:
      break;
  }
  return state;
}
