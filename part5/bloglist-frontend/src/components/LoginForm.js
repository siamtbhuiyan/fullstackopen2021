import PropTypes from 'prop-types'
import React from 'react'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange }) => {


  return (

    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
                username
          <input
            type="text"
            value={username}
            id="username"
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
                password
          <input
            type="password"
            value={password}
            id="password"
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id="login-button">Login</button>
      </form>
    </div>
  )}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
