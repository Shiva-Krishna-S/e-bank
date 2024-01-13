import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {userId: '', pinNumber: '', errorMsg: '', showSubmitError: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {userId, pinNumber} = this.state
    const userDetails = {user_id: userId, pin: pinNumber}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pinNumber: event.target.value})
  }

  render() {
    const {userId, pinNumber, errorMsg, showSubmitError} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <div className="login-page-card-container">
          <div className="login-page-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-page-image"
            />
          </div>

          <form
            onSubmit={this.onSubmitLoginForm}
            className="login-form-container"
          >
            <h1 className="form-title">Welcome Back!</h1>
            <label htmlFor="userId" className="form-label">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              placeholder="Enter User ID"
              value={userId}
              onChange={this.onChangeUserId}
              className="input-element"
            />
            <label htmlFor="pin" className="form-label">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              placeholder="Enter PIN"
              value={pinNumber}
              onChange={this.onChangePin}
              className="input-element"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
