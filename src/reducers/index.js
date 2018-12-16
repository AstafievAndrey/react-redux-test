import { combineReducers } from 'redux';
import { meetingsReducer } from './meetings';

export const rootReducer = combineReducers({
  meetings: meetingsReducer,
});
