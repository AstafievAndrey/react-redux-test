import { combineReducers } from 'redux';

const initialState = [
  {
    day: 'Понедельник',
    date: 'Дата',
    meetings: [
      {
        title: 'тема встречи',
        timeBegin: 'время начала',
        timeEnd: 'время конца',
        members: ['Участник 1', 'Участник 2'],
      },
    ],
  },
  {
    day: 'Вторник',
    date: 'Дата',
    meetings: [
      {
        title: 'тема встречи',
        timeBegin: 'время начала',
        timeEnd: 'время конца',
        members: ['Участник 1', 'Участник 2'],
      },
      {
        title: 'тема встречи',
        timeBegin: 'время начала',
        timeEnd: 'время конца',
        members: ['Участник 1', 'Участник 2'],
      },
    ],
  },
];

export const rootReducer = combineReducers({
  meetings: (state = initialState) => state,
});
