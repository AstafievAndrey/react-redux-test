import React, { Component } from 'react';
import './css/meetingModalComponent.css';

class MeetingModalComponent extends Component {
  state = {
    title: '',
    timeBegin: '',
    timeEnd: '',
    members: [],
  };

  hideModal = () => {
    this.props.hideModal();
  };

  handleChange = e => {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    if (name !== 'members') {
      this.setState({
        [name]: target.value,
      });
    } else {
      const index = target.getAttribute('data-key');
      let { members } = this.state;
      members[index] = target.value;
      this.setState({ members });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addMeeting(this.state);
  };

  renderMembers() {
    if (this.props.members) {
      return this.props.members.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <input
              className="input"
              onChange={this.handleChange}
              value={item}
              data-key={index}
              name="members"
            />
          </React.Fragment>
        );
      });
    }
    return (
      <input
        className="input"
        onChange={this.handleChange}
        data-key="0"
        name="members"
      />
    );
  }

  renderTemplate() {
    const { day, title, timeEnd, timeBegin } = this.props;
    console.log(this.props);
    return (
      <div className="meetingModal">
        <div className="meetingModalTitle">
          <span className="title">Встреча</span>
          <span className="close" onClick={this.hideModal}>
            &#9747;
          </span>
        </div>
        <div className="meetingModalForm">
          <div className="row">
            <div className="column first">Тема встречи</div>
            <div className="column">
              <input
                className="input"
                name="title"
                onChange={this.handleChange}
                value={title}
              />
            </div>
          </div>
          <div className="row">
            <div className="column first">День встречи</div>
            <div className="column">
              <input className="input" value={day} readOnly />
            </div>
          </div>
          <div className="row">
            <div className="column first">Начало встречи</div>
            <div className="column">
              <input
                className="input"
                onChange={this.handleChange}
                value={timeBegin}
                name="timeBegin"
              />
            </div>
          </div>
          <div className="row">
            <div className="column first">Окончание</div>
            <div className="column">
              <input
                className="input"
                onChange={this.handleChange}
                value={timeEnd}
                name="timeEnd"
              />
            </div>
          </div>
          <div className="row">
            <div className="column first">Участники</div>
            <div className="column">
              {this.renderMembers()}
              <span className="addMember">Добавить участника</span>
            </div>
          </div>
        </div>
        <div className="meetingModalAction">
          <div className="btn" onClick={this.hideModal}>
            отмена
          </div>
          <div className="btn btn-primary" onClick={this.handleSubmit}>
            сохранить
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        className="meetingModalComponent"
        onDoubleClick={e => {
          e.stopPropagation();
        }}
      >
        {this.renderTemplate()}
      </div>
    );
  }
}

export default MeetingModalComponent;
