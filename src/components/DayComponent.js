import React, { Component } from 'react';
import './css/dayComponent.css';
import MeetingComponent from './MeetingComponent';
import MeetingModalComponent from './MeetingModalComponent';

const MONTH = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

class DayComponent extends Component {
  state = {
    showModalMeeting: false,
  };

  handleDoubleClick = e => {
    e.preventDefault();
    const { disabled, date } = this.props;
    if (disabled !== true && date > new Date().setHours(0, 0)) {
      this.setState({ showModalMeeting: true });
    }
  };

  hideModalMeeting = () => {
    this.setState({ showModalMeeting: false });
  };

  addMeeting = state => {
    const { index } = this.props;
    // this.hideModalMeeting();
    this.props.addMeeting(index, state);
  };

  updateMeeting = (indexMeeting, data) => {
    const indexDay = this.props.index;
    this.props.updateMeeting(indexDay, indexMeeting, data);
  };

  render() {
    console.log('render DayComponent');
    const { disabled } = this.props;
    return (
      <div
        className={`dayComponent height-100 
                    ${disabled === true ? 'disabled' : ''}`}
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
            actionMeeting={this.addMeeting}
            hideModal={this.hideModalMeeting}
          />
        )}
      </React.Fragment>
    );
  }

  renderMeetings() {
    const { meetings, day, date } = this.props;
    console.log(this.props);
    return meetings
      .slice()
      .sort((a, b) => {
        let ATimeBegin = a.timeBegin.split(':');
        let BTimeBegin = b.timeBegin.split(':');
        ATimeBegin = new Date(date).setHours(ATimeBegin[0], ATimeBegin[1]);
        BTimeBegin = new Date(date).setHours(BTimeBegin[0], BTimeBegin[1]);
        return ATimeBegin - BTimeBegin;
      })
      .map((item, index) => {
        return (
          <MeetingComponent
            key={index}
            indexDay={this.props.index}
            day={day}
            date={date}
            indexMeeting={index}
            updateMeeting={this.updateMeeting}
            meeting={item}
          />
        );
      });
  }

  renderTemplate() {
    const { day, date } = this.props;
    return (
      <React.Fragment>
        <div className="border-bottom dayName">
          <strong>{day}</strong>
        </div>
        <div>
          <div className="border-bottom date">
            {new Date(date).getDate()} {MONTH[new Date(date).getMonth()]}
          </div>
          <div onDoubleClick={this.handleDoubleClick}>
            {this.renderMeetings()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DayComponent;
