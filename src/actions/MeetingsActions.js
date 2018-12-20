import { store } from '../store/configureStore'; //сервера нет будем проверять на то что хранится в памяти
export const ADD_MEETING = 'ADD_MEETING';
export const ADD_SUCCESS_MEETING = 'ADD_SUCCESS_MEETING';
export const ADD_ERROR_MEETING = 'ADD_ERROR_MEETING';

export const UPDATE_MEETING = 'UPDATE_MEETING';
export const UPDATE_SUCCESS_MEETING = 'UPDATE_SUCCESS_MEETING';
export const UPDATE_ERROR_MEETING = 'UPDATE_ERROR_MEETING';

function emptyMembers(data) {
  data.members = data.members.filter(member => {
    return member.name !== '' && member.name !== undefined;
  });
  return data;
}

export function addMeeting(index, data) {
  return dispatch => {
    const storeLocal = store.getState();
    let errors = [];
    data = emptyMembers(data);
    dispatch({ type: ADD_MEETING });

    const dt = (date, time) => {
      time = time.split(':');
      date = new Date(date).setHours(time[0], time[1]);
      return date;
    };

    // проверка на существование встречи
    storeLocal.meetings[index].forEach(element => {
      let { date, timeBegin, timeEnd } = element;
      date = date || storeLocal.meetings[index].date || data.date;
      const check = (begin, end, current, type = 'begin') => {
        if (begin <= current && end >= current) {
          if (type === 'begin' && end === current) {
            return false;
          }
          if (type === 'end' && begin === current) {
            return false;
          }
          return true;
        }
        return false;
      };
      let timeBeginMeeting = dt(date, timeBegin);
      let timeEndMeeting = dt(date, timeEnd);
      let timeBeginCurent = dt(date, data.timeBegin);
      let timeEndCurent = dt(date, data.timeEnd);
      if (
        check(timeBeginMeeting, timeEndMeeting, timeBeginCurent, 'begin') ||
        check(timeBeginMeeting, timeEndMeeting, timeEndCurent, 'end')
      ) {
        errors.push('время занято');
      }
    });

    if (errors.length) {
      console.log(ADD_ERROR_MEETING);
      dispatch({ type: ADD_ERROR_MEETING, index, props: data, errors });
    } else {
      setTimeout(() => {
        dispatch({ type: ADD_SUCCESS_MEETING, index, props: data });
      }, 1000);
    }
    // dispatch({type: ADD_SUCCESS_MEETING, index, props: data});
  };
}

export function updateMeeting(indexDay, indexMeeting, data) {
  return dispatch => {
    dispatch({ type: UPDATE_MEETING });
    data = emptyMembers(data);
    setTimeout(() => {
      dispatch({
        type: UPDATE_SUCCESS_MEETING,
        props: data,
        indexDay,
        indexMeeting,
      });
    }, 1000);
  };
}
