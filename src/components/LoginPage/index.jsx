import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import { Component } from 'react';
import './index.css';

class Login extends Component {
  state = { username: '', password: '', errorMsg: '' };

  updateUsername = (event) => {
    this.setState({ username: event.target.value.toLowerCase() });
  };

  updatePassword = (event) => {
    this.setState({ password: event.target.value.toLowerCase() });
  };

  submitLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    const userDetails = {
      username,
      password,
    };

    const url = 'https://apis.ccbp.in/login';

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    console.log('response: ', response);

    console.log('data: ', data);

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set('jwt_token', jwtToken, { expires: 7 });
    history.replace('/');
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ errorMsg });
  };

  render() {
    const { username, password, errorMsg } = this.state;

    const jwtToken = Cookies.get('jwt_token');

    if (jwtToken) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-page">
        <main className="login-main-content">
          <header className="login-header">
            <img
              className="login-logo"
              src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F907f9cac5e83c3cfa52e31f976a4f9e2.cdn.bubble.io%2Ff1694435786249x476254169322664960%2FGroup%2520680.png?w=&h=&auto=compress&dpr=1&fit=max"
              alt="login-logo"
            />
          </header>

          <form className="login-form" onSubmit={this.submitLogin}>
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              onChange={this.updateUsername}
              value={username}
              type="text"
              placeholder="Enter your username"
            />

            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              onChange={this.updatePassword}
              value={password}
              type="password"
              placeholder="Enter your password"
            />

            <button type="submit">Login</button>

            <p className="login-error-msg">* {errorMsg}</p>
          </form>
        </main>
      </div>
    );
  }
}

export default Login;

// ! Glance at the E-commerce login and protectedRoute mechanism code.
