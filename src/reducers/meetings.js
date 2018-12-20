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
      members: [
        { name: 'Участник 1', active: false },
        { name: 'Участник 2', active: false },
      ],
    },
  ],
  [
    {
      title: 'тема встречи',
      timeBegin: '9:30',
      timeEnd: '10:30',
      members: [
        { name: 'Участник 1', active: true },
        { name: 'Участник 2', active: false },
      ],
    },
    {
      title: 'тема встречи',
      timeBegin: '16:30',
      timeEnd: '18:30',
      members: [
        { name: 'Участник 1', active: true },
        { name: 'Участник 2', active: false },
        { name: 'Участник 3', active: true },
      ],
    },
  ],
  [
    {
      title: 'тема встречи',
      timeBegin: '16:30',
      timeEnd: '18:30',
      members: [
        { name: 'Участник 1', active: true },
        { name: 'Участник 2', active: false },
        { name: 'Участник 3', active: true },
      ],
    },
    {
      title: 'тема встречи',
      timeBegin: '08:30',
      timeEnd: '10:30',
      members: [
        { name: 'Участник 1', active: true },
        { name: 'Участник 2', active: false },
        { name: 'Участник 3', active: true },
      ],
    },
    {
      title: 'тема встречи',
      timeBegin: '11:30',
      timeEnd: '12:30',
      members: [],
    },
  ],
  [
    {
      title: 'тема встречи',
      timeBegin: '16:30',
      timeEnd: '18:30',
      members: [
        { name: 'Участник 1', active: true },
        { name: 'Участник 2', active: false },
        { name: 'Участник 3', active: true },
      ],
    },
    {
      title: 'тема встречи',
      timeBegin: '08:30',
      timeEnd: '10:30',
      members: [
        { name: 'Участник 1', active: true },
        { name: 'Участник 2', active: false },
        { name: 'Участник 3', active: true },
      ],
    },
    {
      title: 'тема встречи',
      timeBegin: '11:30',
      timeEnd: '12:30',
      members: [],
    },
    {
      title: 'тема встречи',
      timeBegin: '06:30',
      timeEnd: '07:30',
      members: [
        { name: 'Участник 1', active: false },
        { name: 'Участник 2', active: false },
      ],
    },
    {
      title: 'тема встречи',
      timeBegin: '18:30',
      timeEnd: '22:30',
      members: [
        { name: 'Участник 1', active: false },
        { name: 'Участник 2', active: false },
      ],
    },
  ],
  [
    {
      title: 'тема встречи',
      timeBegin: '00:00',
      timeEnd: '01:00',
      members: [
        { name: 'Участник 1', active: true },
        { name: 'Участник 2', active: false },
        { name: 'Участник 3', active: true },
      ],
    },
    {
      title: 'тема встречи',
      timeBegin: '00:00',
      timeEnd: '10:00',
      members: [
        { name: 'Участник 1', active: true },
        { name: 'Участник 2', active: false },
        { name: 'Участник 3', active: true },
      ],
    },
  ],
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
        console.log(state, action);
        // draft[action.index].messages.errors = action.errors;
        break;
      case UPDATE_MEETING:
        break;
      case UPDATE_SUCCESS_MEETING:
        draft[action.indexDay][action.indexMeeting] = action.props;
        break;
      default:
        break;
    }
  });
}
