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
    const members = [
      ...(this.props.members
        ? this.props.members
        : [{ name: '', active: false }]),
    ];
    return {
      title: this.props.title || '',
      timeBegin: this.props.timeBegin || '00:00',
      timeEnd: this.props.timeEnd || '00:00',
      day: this.props.day || '',
      members,
    };
  }

  hideModal = () => {
    this.props.hideModal();
  };

  handleChange = e => {
    e.preventDefault();
    this.forceUpdate();
    const target = e.target;
    const name = target.name;
    // let members = [...this.state.members];
    const setMember = (key, name, value) => {
      let members = [...this.state.members];
      members[key][name] = String(value);
      this.setState({ members });
    };
    console.log(name, target.checked);
    switch (name) {
      case 'members':
        setMember(target.getAttribute('data-key'), 'name', target.value);
        break;
      case 'checkMember':
        setMember(target.getAttribute('data-key'), 'active', target.checked);
        this.forceUpdate();
        break;
      default:
        if (!target.checkValidity()) {
          target.style.borderColor = 'red';
        } else {
          target.style.borderColor = '';
        }
        this.setState({
          [name]: target.value,
        });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.actionMeeting(this.state);
  };

  checkActive() {
    const { date } = this.props;
    const timeBegin = this.state.timeBegin.split(':');
    const timeEnd = this.state.timeEnd.split(':');
    let inactive = false;
    let active = false;
    if (date < new Date().setHours(0, 0)) {
      inactive = true;
    }
    if (
      new Date(date).setHours(timeBegin[0], timeBegin[1]) < new Date() &&
      new Date(date).setHours(timeEnd[0], timeEnd[1]) > new Date()
    ) {
      active = true;
    }
    return { inactive, active };
  }

  ckeckBox = key => {
    console.log(key);
    let members = [...this.state.members];
    members[key]['active'] = !members[key]['active'];
    this.setState({ members });
  };

  renderMeemberInput(value, key) {
    // const { date } = this.props;
    let disabled = false;
    const checkActive = this.checkActive();
    if (checkActive.inactive === true || checkActive.active === true) {
      disabled = true;
    }
    console.log(value, key);
    return (
      <React.Fragment key={key}>
        <span onClick={() => this.ckeckBox(key)}>{String(value.active)}</span>
        <input
          className="input membersInput"
          onChange={this.handleChange}
          data-key={key}
          value={value.name}
          disabled={disabled}
          name="members"
        />
      </React.Fragment>
    );
  }

  renderMembers() {
    let result = '';
    if (this.state.members) {
      result = this.state.members.map((item, index) => {
        return this.renderMeemberInput(item, index);
      });
    } else {
      result = this.renderMeemberInput(undefined, 0);
    }
    return (
      <React.Fragment>
        {result}
        <span className="addMember" onClick={this.addMember}>
          Добавить участника
        </span>
      </React.Fragment>
    );
  }

  addMember = () => {
    const members = [...this.state.members, { name: '', active: false }];
    this.setState({ members });
  };

  renderInputTime(name) {
    return (
      <input
        className="input"
        onChange={this.handleChange}
        value={this.state[name]}
        type="time"
        step="1800"
        pattern="[0-24]{2}:(30|00)"
        min={`${new Date().getHours()}:00`}
        name={name}
      />
    );
  }

  renderTitle() {
    let titleText = 'Встреча';
    let grey = false;
    const checkActive = this.checkActive();
    if (checkActive.inactive) {
      titleText = 'Не активная встреча';
      grey = true;
    }
    if (checkActive.active) {
      titleText = 'Активная встреча';
    }
    return (
      <div className={`meetingModalTitle ${grey ? 'grey' : ''}`}>
        <span className="title">{titleText}</span>
        <span className="close" onClick={this.hideModal}>
          &#9747;
        </span>
      </div>
    );
  }

  renderAction() {
    return (
      <div className="meetingModalAction">
        <div className="btn" onClick={this.hideModal}>
          отмена
        </div>
        <div className="btn btn-primary" onClick={this.handleSubmit}>
          сохранить
        </div>
      </div>
    );
  }

  renderTemplate() {
    const { day, title } = this.state;
    return (
      <div className="meetingModal">
        {this.renderTitle()}
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
            <div className="column">{this.renderInputTime('timeBegin')}</div>
          </div>
          <div className="row">
            <div className="column first">Окончание</div>
            <div className="column">{this.renderInputTime('timeEnd')}</div>
          </div>
          <div className="row">
            <div className="column first">Участники</div>
            <div className="column">{this.renderMembers()}</div>
          </div>
        </div>
        {this.renderAction()}
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
