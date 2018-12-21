import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayComponent from '../components/DayComponent';
import { addMeeting, updateMeeting } from '../actions/MeetingsActions';
import { showMessage } from '../actions/MessagesActions';

class DayContainer extends Component {
  render() {
    const {
      index,
      day,
      date,
      meetings,
      addMeeting,
      updateMeeting,
      showMessage,
    } = this.props;
    console.log('render dayContainer', day);
    const disabled =
      new Date(date).getDay() === 0 || new Date(date).getDay() === 6
        ? true
        : false;
    return (
      <React.Fragment>
        <DayComponent
          index={index}
          day={day}
          date={date}
          meetings={meetings}
          disabled={disabled}
          addMeeting={addMeeting}
          updateMeeting={updateMeeting}
          showMessage={showMessage}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store, { index }) => {
  return {
    meetings: store.meetings[index],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMeeting: (index, data) => dispatch(addMeeting(index, data)),
    updateMeeting: (indexDay, indexMeeting, data) =>
      dispatch(updateMeeting(indexDay, indexMeeting, data)),
    showMessage: (type, message) => {
      dispatch(showMessage(type, message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayContainer);
