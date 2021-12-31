import "./Form.css";

export const FailForm = ({ handleNewGame }) => {
  return (
    <div className="form">
      <span className="formAnnouncementText">You Lost</span>
      <div className="formButtons">
        <div className="formButton">
          <button className="buttonYellow" onClick={() => handleNewGame()}>
            Restart
          </button>
        </div>
        <div className="formButton">
          <button className="buttonRed" onClick={() => window.location.replace("/")}>
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};
