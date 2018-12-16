import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayComponent from '../components/DayComponent';
import { addMeeting } from '../actions/MeetingsActions';

class DayContainer extends Component {
  render() {
    const { index, day, date, meetings, addMeeting } = this.props;
    console.log('render dayContainer', day);
    return (
      <React.Fragment>
        <DayComponent
          index={index}
          day={day}
          date={date}
          meetings={meetings}
          addMeeting={addMeeting}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store, { index }) => {
  // console.log(store);
  return {
    meetings: store.meetings[index],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMeeting: (index, data) => dispatch(addMeeting(index, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayContainer);
