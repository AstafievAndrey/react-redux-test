import React, { Component } from 'react';
import './App.css';

import DayContainer from './containers/DayContainer';

const DayWeek = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

class App extends Component {
  renderTemplate() {
    return DayWeek.map((item, index) => {
      return <DayContainer key={index} day={item} index={index} date="date" />;
    });
  }

  render() {
    console.log('render App');
    return <div className="App height-100">{this.renderTemplate()}</div>;
  }
}

export default App;
