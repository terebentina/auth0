import React, { PureComponent, PropTypes } from 'react';

const types = {
  error: 'alert-danger',
  success: 'alert-success',
};

const duration = 4000;
let timeoutID;

class Message extends PureComponent {

  componentDidMount() {
    timeoutID = setTimeout(this.props.onHide, duration);
  }

  componentWillUnmount() {
    clearTimeout(timeoutID);
  }

  render() {
    const { type, text } = this.props;

    if (text) {
      return (
        <div className={`alert ${types[type] || ''}`}>
          {text}
        </div>
      );
    }

    return null;
  }
}

Message.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onHide: PropTypes.func.isRequired,
};

Message.defaultProps = {
  type: 'success',
};

export default Message;
