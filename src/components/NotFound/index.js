import './index.css'

const NotFound = props => {
  const goToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-route">
      <img
        src="https://res.cloudinary.com/dkxj0xjra/image/upload/v1672378644/Covid%20Dashboard/Not_found_pic_oinllg.png"
        alt="not-found-pic"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found
        <br />
        Please go back to the homepage
      </p>
      <button type="button" className="not-found-button" onClick={goToHome}>
        Home
      </button>
    </div>
  )
}

export default NotFound
