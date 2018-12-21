import React, { Component } from 'react';
import './css/meetingModalComponent.css';

class MeetingModalComponent extends Component {
  constructor(props) {
    super(props);
    if (this.state === undefined) {
      this.state = this.initState();
    }
  }

  showMessage(type, message) {
    this.props.showMessage(type, message);
  }

  initState() {
    const members = [
      ...(this.props.members
        ? this.props.members
        : [{ name: '', active: false }]),
    ];
    const dt = new Date();
    const floor = Math.floor(dt.getMinutes() / 10);
    let timeBegin = `${floor < 3 ? dt.getHours() : dt.getHours() + 1}:${
      floor < 3 ? '30' : '00'
    }`;
    let timeEnd = new Date(
      new Date(dt).setHours(
        timeBegin.split(':')[0],
        timeBegin.split(':')[1] + 30
      )
    );
    return {
      title: this.props.title || '',
      timeBegin: this.props.timeBegin || timeBegin,
      timeEnd:
        this.props.timeEnd || `${timeEnd.getHours()}:${timeEnd.getMinutes()}`,
      day: this.props.day || '',
      date: this.props.date,
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
    const setMember = (key, name, value) => {
      let members = [...this.state.members];
      members[key][name] = String(value);
      this.setState({ members });
    };
    switch (name) {
      case 'members':
        setMember(target.getAttribute('data-key'), 'name', target.value);
        break;
      default:
        this.setState({
          [name]: target.value,
        });
    }
  };

  // проверка на корректное заполенность полей
  validate() {
    if (!document.meetingModalForm.checkValidity()) {
      this.showMessage('errors', ['Заполите все поля корректно']);
      return;
    }
    const checkRegexTime = value => {
      return /^[0-9]{2}:(30|00)$/.test(value);
    };
    const { timeEnd, timeBegin } = document.meetingModalForm;
    if (!checkRegexTime(timeBegin.value)) {
      this.showMessage('errors', ['Дата начала имеет не верный формат']);
      return;
    }
    if (!checkRegexTime(timeEnd.value)) {
      this.showMessage('errors', ['Дата окончания имеет не верный формат']);
      return;
    }
    if (parseInt(timeEnd.value) < parseInt(timeBegin.value)) {
      this.showMessage('errors', [
        'Дата окончания не может быть раньше даты начала',
      ]);
      return;
    }
    return true;
  }

  handleSubmit = e => {
    e.preventDefault();
    const { newMeeting } = this.props;
    //проверки при добавлении даты
    if (newMeeting === true) {
      this.validate() === true && this.props.actionMeeting(this.state);
    } else {
      this.props.actionMeeting(this.state);
    }
  };

  checkActive() {
    const { date, newMeeting } = this.props;
    let timeBegin = null,
      timeEnd = null,
      inactive = false,
      active = false;

    if (newMeeting === true) {
      return { inactive, active };
    }

    timeBegin = ((timeBegin = this.state.timeBegin.split(':')),
    new Date(date).setHours(timeBegin[0], timeBegin[1]));
    timeEnd = ((timeEnd = this.state.timeEnd.split(':')),
    new Date(date).setHours(timeEnd[0], timeEnd[1]));

    if (date < new Date().setHours(0, 0) || timeEnd < new Date()) {
      inactive = true;
    }
    if (timeBegin < new Date() && timeEnd > new Date()) {
      active = true;
    }

    return { inactive, active };
  }

  ckeckBox = key => {
    const checkActive = this.checkActive();
    let members = [...this.state.members];
    members[key]['active'] = !members[key]['active'];
    checkActive.active && this.setState({ members });
  };

  renderMeemberInput(value, key) {
    let disabled = false;
    const checkActive = this.checkActive();
    if (checkActive.inactive === true || checkActive.active === true) {
      disabled = true;
    }
    return (
      <React.Fragment key={key}>
        <span onClick={() => this.ckeckBox(key)}>
          <input
            className={`${
              (checkActive.inactive || checkActive.active) && value.name !== ''
                ? ''
                : 'none'
            }`}
            type={'checkbox'}
            checked={value.active}
            readOnly
          />
          <input
            className="input membersInput"
            onChange={this.handleChange}
            onClick={() => this.ckeckBox(key)}
            data-key={key}
            value={value.name}
            disabled={disabled}
            required
            name="members"
          />
        </span>
      </React.Fragment>
    );
  }

  renderMembers() {
    const checkActive = this.checkActive();
    let result = '';
    if (this.state.members) {
      result = this.state.members.map((item, index) => {
        return this.renderMeemberInput(item, index);
      });
    } else {
      result = this.renderMeemberInput(undefined, 0);
    }
    const add = () => {
      return (
        <span className="addMember" onClick={this.addMember}>
          Добавить участника
        </span>
      );
    };
    return (
      <React.Fragment>
        {result}
        {checkActive.inactive === false &&
          checkActive.active === false &&
          add()}
      </React.Fragment>
    );
  }

  addMember = () => {
    const members = [...this.state.members, { name: '', active: false }];
    this.setState({ members });
  };

  renderInputTime(name) {
    const checkActive = this.checkActive();
    return (
      <input
        className="input"
        onChange={this.handleChange}
        value={this.state[name]}
        type="time"
        step="1800"
        readOnly={checkActive.inactive || checkActive.active}
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
    const checkActive = this.checkActive();
    const save = () => (
      <div className="btn btn-primary" onClick={this.handleSubmit}>
        сохранить
      </div>
    );
    const cancel = () => (
      <div className="btn" onClick={this.hideModal}>
        отмена
      </div>
    );
    return (
      <div className="meetingModalAction">
        {checkActive.active === false && cancel()}
        {(checkActive.inactive === false || checkActive.active === true) &&
          save()}
      </div>
    );
  }

  renderTemplate() {
    const { day, title } = this.state;
    const checkActive = this.checkActive();
    return (
      <div className="meetingModal">
        {this.renderTitle()}
        <form name="meetingModalForm" className="meetingModalForm">
          <div className="row">
            <div className="column first">Тема встречи</div>
            <div className="column">
              <input
                className="input"
                name="title"
                onChange={this.handleChange}
                defaultValue={title}
                required
                readOnly={checkActive.inactive || checkActive.active}
              />
            </div>
          </div>
          <div className="row">
            <div className="column first">День встречи</div>
            <div className="column">
              <input className="input" defaultValue={day} readOnly />
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
        </form>
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
