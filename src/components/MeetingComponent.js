import React, { Component } from 'react';
import './css/meetingComponent.css';

class MeetingComponent extends Component {
  renderTemplate() {
    return <React.Fragment>meeting</React.Fragment>;
  }

  render() {
    return <div className="meetingComponent">{this.renderTemplate()}</div>;
  }
}

export default MeetingComponent;
