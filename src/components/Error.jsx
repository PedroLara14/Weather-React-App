import "./styles/error.css"

const Error = ({ error }) => {
  return (
    <div className="error-container">
      <div className="error-text">
        {error}. We're sorry, but in order to provide accurate weather
        information, we require access to your location. Please grant permission
        to access your location in your browser settings to continue using the
        app
      </div>
    </div>
  );
}

export default Error