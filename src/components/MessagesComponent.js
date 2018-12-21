import React, { Component } from 'react';
import './css/messagesComponent.css';

class MessagesComponent extends Component {
  removeMessage = (index, type) => {
    this.props.removeMessage(index, type);
  };

  renderMessage(messages, type) {
    console.log(messages);
    return messages
      .slice()
      .reverse()
      .map((element, index) => {
        return (
          <div
            onClick={() => this.removeMessage(index, type)}
            className={type}
            key={`${type}-${index}`}
          >
            {element}
          </div>
        );
      });
  }

  render() {
    const { errors, warnings } = this.props;
    console.log(this.props);
    return (
      <div className="messagesComponent">
        {this.renderMessage(errors, 'errors')}
        {this.renderMessage(warnings, 'warnings')}
      </div>
    );
  }
}

export default MessagesComponent;
