import { Link } from "react-router-dom";

import "./Landing.css";

export const Landing = () => {
  return (
    <div className="landing">
      <div className="header">
        <div className="headerContent">
          <div className="headerTitle">
            <span className="titleItem">Hangman</span>
            <span className="subtitleItem">game</span>
          </div>
          <button className="headerButton" onClick={() => window.location.replace("/game")}>
            Play
          </button>
        </div>
      </div>
      <div className="main">
        <div className="about">
          <h3>About</h3>
          <p>
            Hangman is a paper and pencil guessing game for two or more players. One player thinks of a word, phrase or sentence and the other(s) tries to guess
            it by suggesting letters within a certain number of guesses.
          </p>
          <h4>History</h4>
          <p>
            Though the origins of the game are unknown, a variant is mentioned in a book of children's games assembled by Alice Gomme in 1894 called Birds,
            Beasts, and Fishes.[1] This version lacks the image of a hanged man, instead relying on keeping score as to the number of attempts it took each
            player to fill in the blanks.
          </p>
          <button className="aboutButton" onClick={() => window.open("https://en.wikipedia.org/wiki/Hangman_(game)", "_blank")}>
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};
