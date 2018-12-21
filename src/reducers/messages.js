import {
  SHOW_MESSAGE_ERROR,
  REMOVE_MESSAGE,
  SHOW_MESSAGE_WARNING,
  SHOW_MESSAGE_SUCCESS,
} from '../actions/MessagesActions';
import produce from 'immer';

const initialState = {
  errors: [],
  warnings: [
    'Тут будут выходить сообщения об ошибках! Кликни по мне и я исчезну!',
  ],
  success: [],
};

export function messagesReducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case SHOW_MESSAGE_ERROR:
        draft.errors = [...draft.errors, ...action.props];
        break;
      case SHOW_MESSAGE_WARNING:
        draft.warnings = [...draft.warnings, ...[action.props]];
        break;
      case SHOW_MESSAGE_SUCCESS:
        draft.success = [...draft.success, ...[action.props]];
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
