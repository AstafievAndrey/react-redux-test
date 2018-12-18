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

  updateMeeting = (indexMeeting, data) => {
    const indexDay = this.props.index;
    this.props.updateMeeting(indexDay, indexMeeting, data);
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
            actionMeeting={this.addMeeting}
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
          indexDay={this.props.index}
          day={day}
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
        <div className="border-bottom date">
          {new Date(date).getDate()} {MONTH[new Date(date).getMonth()]}
        </div>
        <div onDoubleClick={this.handleDoubleClick}>
          {this.renderMeetings()}
        </div>
      </React.Fragment>
    );
  }
}

export default DayComponent;