import "./Form.css";

export const RestartForm = ({ closeModal, handleRestart }) => {
  return (
    <div className="form">
      <span className="formTitle">Are you sure you want to restart the game?</span>
      <div className="formButtons">
        <div className="formButton">
          <button className="buttonYellow" onClick={() => closeModal()}>
            Resume
          </button>
        </div>
        <div className="formButton">
          <button className="buttonRed" onClick={() => handleRestart()}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};
