import React, { Component } from 'react';
import './css/meetingModalComponent.css';

class MeetingModalComponent extends Component {
  renderTemplate() {
    return (
      <div className="meetingModal">
        <div className="meetingModalTitle">
          <span className="title">Встреча</span>
          <span className="close">&#9747;</span>
        </div>
        <div className="meetingModalForm">
          <div className="row">
            <div className="column first">Тема встречи</div>
            <div className="column">
              <input className="input" />
            </div>
          </div>
          <div className="row">
            <div className="column first">День встречи</div>
            <div className="column">
              <input className="input" />
            </div>
          </div>
          <div className="row">
            <div className="column first">Начало встречи</div>
            <div className="column">
              <input className="input" />
            </div>
          </div>
          <div className="row">
            <div className="column first">Окончание</div>
            <div className="column">
              <input className="input" />
            </div>
          </div>
          <div className="row">
            <div className="column first">Участники</div>
            <div className="column">
              <input className="input" />
              <span className="addMember">Добавить участника</span>
            </div>
          </div>
        </div>
        <div className="meetingModalAction">
          <div className="btn">отмена</div>
          <div className="btn btn-primary">сохранить</div>
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
