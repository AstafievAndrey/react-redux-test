import React, { Component } from 'react';
import './css/meetingModalComponent.css';

class MeetingModalComponent extends Component {
  constructor(props) {
    super(props);
    if (this.state === undefined) {
      this.state = this.initState();
    }
  }

  initState() {
    const members = [...(this.props.members ? this.props.members : [''])];
    return {
      title: this.props.title || '',
      timeBegin: this.props.timeBegin || '',
      timeEnd: this.props.timeEnd || '',
      day: this.props.day || '',
      members,
    };
  }

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
      let members = [...this.state.members];
      members[index] = target.value;
      console.log(members);
      this.setState({ members });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.actionMeeting(this.state);
  };

  renderMeemberInput(value, key) {
    return (
      <React.Fragment key={key}>
        <input
          className="input membersInput"
          onChange={this.handleChange}
          data-key={key}
          value={value}
          name="members"
        />
      </React.Fragment>
    );
  }

  renderMembers() {
    if (this.state.members) {
      return this.state.members.map((item, index) => {
        return this.renderMeemberInput(item, index);
      });
    }
    return this.renderMeemberInput(undefined, 0);
  }

  addMember = () => {
    const members = [...this.state.members, ''];
    this.setState({ members });
  };

  renderTemplate() {
    const { day, title, timeBegin, timeEnd } = this.state;
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
              <span className="addMember" onClick={this.addMember}>
                Добавить участника
              </span>
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
