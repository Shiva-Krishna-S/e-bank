import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <nav className="navbar-container">
      <div className="navbar-sub-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="logo-image"
          />
        </Link>

        <button type="button" onClick={onClickLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
