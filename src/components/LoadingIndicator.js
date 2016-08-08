import React, { PropTypes } from 'react';

function LoadingIndicator({ className, show }) {
  return (
    show &&
      <div className={`spinner spinner-md is-auth0 ${className}`}>
        <div className="circle" />
      </div>
  );
}

LoadingIndicator.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
};

export default LoadingIndicator;
