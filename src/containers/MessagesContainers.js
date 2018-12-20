import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessagesComponent from '../components/MessagesComponent';

class MessagesContainer extends Component {
  render() {
    console.log('render MessagesContainer');
    return (
      <React.Fragment>
        <MessagesComponent />
      </React.Fragment>
    );
  }
}

// const mapStateToProps = (store, { index }) => {
//   // console.log(store);
//   return {
//     meetings: store.meetings[index],
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     addMeeting: (index, data) => dispatch(addMeeting(index, data)),
//     updateMeeting: (indexDay, indexMeeting, data) =>
//       dispatch(updateMeeting(indexDay, indexMeeting, data)),
//   };
// };

export default connect(
  null,
  null
)(MessagesContainer);
