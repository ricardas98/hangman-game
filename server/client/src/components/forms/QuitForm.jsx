import "./Form.css";

export const QuitForm = ({ closeModal, handleQuit }) => {
  return (
    <div className="form">
      <span className="formTitle">Are you sure you want to quit the game?</span>
      <div className="formButtons">
        <div className="formButton">
          <button className="buttonYellow" onClick={() => closeModal()}>
            Resume
          </button>
        </div>
        <div className="formButton">
          <button className="buttonRed" onClick={() => handleQuit()}>
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};
