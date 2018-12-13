import React, { Component } from 'react';
import MeetingComponent from './MeetingComponent';
import './css/dayComponent.css';

class DayComponent extends Component {
  render() {
    return (
      <div className="dayComponent height-100">{this.renderTemplate()}</div>
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
        {this.renderMeetings()}
      </React.Fragment>
    );
  }
}

export default DayComponent;
