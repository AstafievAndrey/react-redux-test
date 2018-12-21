import { SHOW_MESSAGE_ERROR, REMOVE_MESSAGE } from '../actions/MessagesActions';
import produce from 'immer';

const initialState = {
  errors: [],
  warnings: [
    'Тут будут выходить сообщения об ошибках! Кликни по мне и я исчезну!',
  ],
};

export function messagesReducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case SHOW_MESSAGE_ERROR:
        draft.errors = [...draft.errors, ...action.props];
        break;
      case REMOVE_MESSAGE:
        const { type, index } = action.props;
        draft[type].splice(index, 1);
        break;
      default:
        break;
    }
  });
}
