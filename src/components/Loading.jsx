import "./styles/loading.css"

const Loading = () => {
  return (
    <div className="loading-container">
      <h1 className="loading-title">Gathering Weather Data For Your Location...</h1>
      <div className="loading-spinner"></div>
    </div>
  );
}

export default Loading