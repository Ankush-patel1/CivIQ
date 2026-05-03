const Loader = ({ fullScreen = false }) => {
  return (
    <div className={fullScreen ? "loading-screen" : "page-loader"} role="alert" aria-busy="true">
      <div className="loader-container">
        <div className="loader-ring">
          <div className="loader-core"></div>
        </div>
        <div className="loader-pulse"></div>
      </div>
      <span className="loading-text">CIVIQ IS {fullScreen ? "LOADING" : "PREPARING"}...</span>
    </div>
  );
};

export default Loader;
