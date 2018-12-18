import {
  ADD_MEETING,
  ADD_SUCCESS_MEETING,
  ADD_ERROR_MEETING,
  UPDATE_MEETING,
  UPDATE_SUCCESS_MEETING,
} from '../actions/MeetingsActions';

import produce from 'immer';

const initialState = [
  [
    {
      title: 'тема встречи',
      timeBegin: '11:30',
      timeEnd: '12:30',
      members: ['Участник 1', 'Участник 2'],
    },
  ],
  [
    {
      title: 'тема встречи',
      timeBegin: '9:30',
      timeEnd: '10:30',
      members: ['Участник 1', 'Участник 2'],
    },
    {
      title: 'тема встречи',
      timeBegin: '16:30',
      timeEnd: '18:30',
      members: ['Участник 1', 'Участник 2', 'Участник 3'],
    },
  ],
  [],
  [],
  [],
  [],
  [],
];

export function meetingsReducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_MEETING:
        break;
      case ADD_SUCCESS_MEETING:
        draft[action.index].push(action.props);
        break;
      case ADD_ERROR_MEETING:
        break;
      case UPDATE_MEETING:
        break;
      case UPDATE_SUCCESS_MEETING:
        console.log(action);
        draft[action.indexDay][action.indexMeeting] = action.props;
        break;
      default:
        break;
    }
  });
}
