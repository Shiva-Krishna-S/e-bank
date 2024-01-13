import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-page-container">
    <Header />
    <div className="home-page-content-container">
      <h1 className="home-page-title">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="digital-card-image"
      />
    </div>
  </div>
)

export default Home
