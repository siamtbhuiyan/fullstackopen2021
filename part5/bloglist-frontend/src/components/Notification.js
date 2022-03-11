import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, errorMessage }) => {
  const notificationStyle = {
    color: 'green',
  }
  const errorStyle = {
    color: 'red',
  }
  return (
    <div>
      <div style={notificationStyle}>
        <h2>{message}</h2>
      </div>
      <div style={errorStyle}>
        <h2>{errorMessage}</h2>
      </div>
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.string
}

export default Notification
