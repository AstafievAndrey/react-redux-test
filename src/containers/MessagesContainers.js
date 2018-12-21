import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeMessage } from '../actions/MessagesActions';
import MessagesComponent from '../components/MessagesComponent';

class MessagesContainer extends Component {
  render() {
    console.log('render MessagesContainer');
    const { removeMessage } = this.props;
    const { errors, warnings, success } = this.props.messages;
    return (
      <React.Fragment>
        <MessagesComponent
          errors={errors}
          warnings={warnings}
          success={success}
          removeMessage={removeMessage}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    messages: store.messages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeMessage: (index, type) => dispatch(removeMessage(index, type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);
