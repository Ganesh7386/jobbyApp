import './index.css'

function NotFound() {
  return (
    <div style={{color: 'white'}}>
      <h1>Page Not Found</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notFoundImgStyling"
      />
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  )
}

export default NotFound
