import React, { Component } from 'react';
import './css/dayComponent.css';
import MeetingComponent from './MeetingComponent';
import MeetingModalComponent from './MeetingModalComponent';

class DayComponent extends Component {
  state = {
    showModalMeeting: false,
  };

  handleDoubleClick = e => {
    console.log('doubleClick');
    e.preventDefault();
    this.setState({ showModalMeeting: true });
  };

  render() {
    const { showModalMeeting } = this.state;
    return (
      <div
        className="dayComponent height-100"
        onDoubleClick={this.handleDoubleClick}
      >
        {this.renderTemplate()}
        {showModalMeeting && <MeetingModalComponent />}
      </div>
    );
  }

  renderMeetings() {
    const { meetings } = this.props;
    return meetings.map((item, index) => {
      return <MeetingComponent key={index} meeting={item} />;
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
