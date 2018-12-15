import React, { Component } from 'react';
import './css/meetingComponent.css';

class MeetingComponent extends Component {
  handleDoubleClick(e) {
    console.log('meeting doubleClick stopPropagation');
    e.stopPropagation();
  }

  renderTemplate() {
    return <div onDoubleClick={this.handleDoubleClick}>meeting</div>;
  }

  render() {
    return <div className="meetingComponent">{this.renderTemplate()}</div>;
  }
}

export default MeetingComponent;
