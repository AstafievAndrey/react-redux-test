import React, { Component } from 'react';
import './css/dayComponent.css';
import MeetingComponent from './MeetingComponent';
import MeetingModalComponent from './MeetingModalComponent';

class DayComponent extends Component {
  state = {
    showModalMeeting: false,
  };

  handleDoubleClick = e => {
    e.preventDefault();
    this.setState({ showModalMeeting: true });
  };

  hideModalMeeting = () => {
    this.setState({ showModalMeeting: false });
  };

  addMeeting = state => {
    const { index } = this.props;
    this.hideModalMeeting();
    this.props.addMeeting(index, state);
  };

  render() {
    console.log('render DayComponent');
    return (
      <div
        className="dayComponent height-100"
        onDoubleClick={this.handleDoubleClick}
      >
        {this.renderTemplate()}
        {this.renderMeetingModal()}
      </div>
    );
  }

  renderMeetingModal() {
    const { showModalMeeting } = this.state;
    const { day, date } = this.props;
    return (
      <React.Fragment>
        {showModalMeeting && (
          <MeetingModalComponent
            key={'addDay'}
            day={day}
            date={date}
            addMeeting={this.addMeeting}
            hideModal={this.hideModalMeeting}
          />
        )}
      </React.Fragment>
    );
  }

  renderMeetings() {
    const { meetings, day } = this.props;
    console.log(this.props);
    return meetings.map((item, index) => {
      return (
        <MeetingComponent
          key={index}
          index={this.props.index}
          day={day}
          indexMeeting={index}
          meeting={item}
        />
      );
    });
  }

  renderTemplate() {
    const { day, date } = this.props;
    return (
      <React.Fragment>
        <div className="border-bottom dayName">{day}</div>
        <div className="border-bottom date">{date}</div>
        <div onDoubleClick={this.handleDoubleClick}>
          {this.renderMeetings()}
        </div>
      </React.Fragment>
    );
  }
}

export default DayComponent;
