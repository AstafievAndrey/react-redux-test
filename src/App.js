import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';

import DayComponent from './components/DayComponent';

class App extends Component {
  renderTemplate() {
    const { meetings } = this.props;
    return meetings.map((item, index) => {
      return (
        <DayComponent
          key={index}
          day={item.day}
          date={item.date}
          meetings={item.meetings}
        />
      );
    });
  }

  render() {
    console.log(this.props);
    return <div className="App height-100">{this.renderTemplate()}</div>;
  }
}
const mapStateToProps = store => {
  return {
    meetings: store.meetings,
  };
};
export default connect(mapStateToProps)(App);
