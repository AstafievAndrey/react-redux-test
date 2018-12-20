import { combineReducers } from 'redux';
import { meetingsReducer } from './meetings';
import { messagesReducer } from './messages';

export const rootReducer = combineReducers({
  meetings: meetingsReducer,
  messages: messagesReducer,
});
