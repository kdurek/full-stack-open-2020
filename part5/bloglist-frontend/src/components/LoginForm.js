import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createLogin = (event) => {
    event.preventDefault();

    handleLogin({
      username,
      password,
    });

    setUsername("");
    setPassword("");
  };
  return (
    <form onSubmit={createLogin}>
      <div id="login">
        username
        <input
          id="loginform__username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="loginform__password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginform__submit" type="submit">
        login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
