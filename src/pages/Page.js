import React, { PropTypes } from 'react';
import Message from '../components/Message';

function Page({ title, children, message, onMessageHide }) {
  const hasMessage = message && message.text;

  return (
    <div>
      <h1>{title}</h1>
      {
        hasMessage &&
          <Message {...message} onHide={onMessageHide} />
      }
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  message: PropTypes.object,
  onMessageHide: PropTypes.func.isRequired,
};

export default Page;
