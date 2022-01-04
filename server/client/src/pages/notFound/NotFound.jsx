import "./NotFound.css";

export const NotFound = () => {
  return (
    <div className="notFound">
      <span className="notFoundTitle">Error 404</span>
      <span className="notFoundSubtitle">Page Not Found</span>
      <div className="notFoundButton">
        <button className="buttonRed" onClick={() => window.location.replace("/")}>
          Home page
        </button>
      </div>
    </div>
  );
};
