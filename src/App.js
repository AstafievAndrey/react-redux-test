import React, { Component } from 'react';
import './App.css';

import DayContainer from './containers/DayContainer';
import MessagesContainers from './containers/MessagesContainers';

const DayWeek = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const dateWeek = date => {
  date = new Date(date);
  const day = date.getDay(),
    diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = date.setDate(diff);
  return [
    monday,
    new Date(monday).setDate(diff + 1),
    new Date(monday).setDate(diff + 2),
    new Date(monday).setDate(diff + 3),
    new Date(monday).setDate(diff + 4),
    new Date(monday).setDate(diff + 5),
    new Date(monday).setDate(diff + 6),
  ];
};

class App extends Component {
  renderTemplate() {
    const dt = dateWeek(new Date());
    return DayWeek.map((item, index) => {
      return (
        <DayContainer key={index} day={item} index={index} date={dt[index]} />
      );
    });
  }

  render() {
    console.log('render App');
    return (
      <React.Fragment>
        <div className="App height-100">{this.renderTemplate()}</div>
        <MessagesContainers />
      </React.Fragment>
    );
  }
}

export default App;
