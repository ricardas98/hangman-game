import { useEffect, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import axios from "axios";

import { Key } from "../../components/key/Key";
import { Modal } from "../../components/modal/Modal";

import "./Game.css";
import { QuitForm } from "../../components/forms/QuitForm";
import { RestartForm } from "../../components/forms/RestartForm";
import { SuccessForm } from "../../components/forms/SuccessFormForm";
import { FailForm } from "../../components/forms/FailFrom";

export const Game = () => {
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];
  const [commandId, setCommandId] = useState("");
  const [id, setId] = useState("");
  const [word, setWord] = useState("");
  const [misses, setMisses] = useState([]);

  const [dataReceived, setDataReceived] = useState(false);
  //---------------------------------------------------------------------
  //--------------------------------MODALS-------------------------------
  //---------------------------------------------------------------------

  const [ModalQuit, openQuit, closeQuit] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const [ModalRestart, openRestart, closeRestart] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const [ModalSuccess, openSuccess, closeSuccess, isOpenSuccess] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const [ModalFail, openFail, closeFail, isOpenFail] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  //---------------------------------------------------------------------
  //------------------------------USE EFFECT-----------------------------
  //---------------------------------------------------------------------

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (commandId == 2) {
      openSuccess();
    } else if (commandId == 1) {
      openFail();
    }
  }, [commandId]);

  //---------------------------------------------------------------------
  //------------------------------FUNCTIONS------------------------------
  //---------------------------------------------------------------------

  const updateState = (data) => {
    setCommandId(data.id);
    setId(data.data.id);
    setWord(data.data.word);
    setMisses(data.data.misses);
  };

  async function fetchData() {
    setDataReceived(false);
    try {
      await axios.post(`/api/games`, {}).then((res) => {
        updateState(res.data);
        setDataReceived(true);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleGuess(letter) {
    try {
      const payload = {
        letter: letter,
      };
      await axios.put(`/api/games/${id}`, payload).then((res) => {
        updateState(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleQuit() {
    try {
      await axios.delete(`/api/games/${id}`);
    } catch (err) {
      console.log(err);
    }
    closeQuit();
    closeSuccess();
    window.location.replace("/");
  }

  async function handleNewGame() {
    isOpenSuccess && closeSuccess();
    isOpenFail && closeFail();
    fetchData();
  }

  async function handleRestart() {
    try {
      await axios.delete(`/api/games/${id}`).then(() => {});
    } catch (err) {
      console.log(err);
    }
    closeRestart();
    fetchData();
  }

  return (
    dataReceived && (
      <>
        <div className="game">
          <div className="gameHeader">
            <div className="gameHeaderLeft">
              <div className="gameHeaderItem">
                <span className="gameSessionId">Session id: {id}</span>
              </div>
            </div>
            <div className="gameHeaderRight">
              <div className="gameHeaderItem">
                <button className="buttonYellow" onClick={() => openRestart()}>
                  Restart
                </button>
              </div>
              <div className="gameHeaderItem">
                <button className="buttonRed" onClick={() => openQuit()}>
                  Quit
                </button>
              </div>
            </div>
          </div>
          <div className="gameContent">
            <span className="gameWord">{word}</span>
            <div className="gameKeyboard">
              {keyboard.map((row, index) => (
                <div key={index} className="gameKeyboardRow">
                  {row.map((c) => (
                    <button
                      key={c}
                      className={misses.includes(c) ? "gameKeyboardButtonDisabled" : "gameKeyboardButton"}
                      disabled={misses.includes(c) ? true : false}
                      onClick={() => {
                        handleGuess(c);
                      }}
                    >
                      <Key letter={c} />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Modal Modal={ModalQuit}>
          <QuitForm closeModal={closeQuit} handleQuit={handleQuit} />
        </Modal>

        <Modal Modal={ModalRestart}>
          <RestartForm closeModal={closeRestart} handleRestart={handleRestart} />
        </Modal>

        <Modal Modal={ModalSuccess}>
          <SuccessForm handleNewGame={handleNewGame} word={word} />
        </Modal>

        <Modal Modal={ModalFail}>
          <FailForm handleNewGame={handleNewGame} />
        </Modal>
      </>
    )
  );
};
