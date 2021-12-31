import "./Form.css";

export const SuccessForm = ({ handleNewGame, word }) => {
  return (
    <div className="form">
      <span className="formAnnouncementText">You Won!</span>
      <span className="formSubtitle">The word is "{word}"</span>
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
