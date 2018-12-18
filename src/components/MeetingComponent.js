import React, { Component } from 'react';
import './css/meetingComponent.css';
import MeetingModalComponent from './MeetingModalComponent';

class MeetingComponent extends Component {
  state = {
    showModalMeeting: false,
  };

  hideModalMeeting = () => {
    this.setState({ showModalMeeting: false });
  };

  showModalMeeting = () => {
    this.setState({ showModalMeeting: true });
  };

  handleDoubleClick = e => {
    e.stopPropagation();
    this.showModalMeeting();
  };

  updateMeeting = data => {
    const { indexMeeting } = this.props;
    this.props.updateMeeting(indexMeeting, data);
  };

  renderTemplate() {
    const { day } = this.props;
    const { timeBegin, timeEnd, members, title } = this.props.meeting;
    const { showModalMeeting } = this.state;
    return (
      <React.Fragment>
        <div onDoubleClick={this.handleDoubleClick}>{timeBegin} >> Встреча</div>
        {showModalMeeting && (
          <MeetingModalComponent
            day={day}
            title={title}
            timeBegin={timeBegin}
            timeEnd={timeEnd}
            members={members}
            hideModal={this.hideModalMeeting}
            actionMeeting={this.updateMeeting}
          />
        )}
      </React.Fragment>
    );
  }

  render() {
    return <div className="meetingComponent">{this.renderTemplate()}</div>;
  }
}

export default MeetingComponent;
