import { useEffect, useState } from "react";
import axios from "axios";

import { Key } from "../../components/key/Key";

import "./Game.css";

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

  const updateState = (data) => {
    console.log(data);
    setCommandId(data.id);
    setId(data.data.id);
    setWord(data.data.word);
    setMisses(data.data.misses);
  };

  async function fetchData() {
    try {
      await axios.post(`api/games`, {}).then((res) => {
        updateState(res.data);
        setDataReceived(true);
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleGuess = async (letter) => {
    try {
      await axios.post(`api/games/${id}`, { letter: letter }).then((res) => {
        updateState(res.data);
        setDataReceived(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    dataReceived && (
      <div className="game">
        <div className="gameHeader">
          <div className="gameHeaderLeft">
            <div className="gameHeaderItem">
              <span className="gameSessionId">Session id: {id}</span>
            </div>
          </div>
          <div className="gameHeaderRight">
            <div className="gameHeaderItem">
              <button className="buttonYellow">Restart</button>
            </div>
            <div className="gameHeaderItem">
              <button className="buttonRed">Quit</button>
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
                    className="gameKeyboardButton"
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
    )
  );
};
