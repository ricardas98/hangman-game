import { Link } from "react-router-dom";

import "./Landing.css";

export const Landing = () => {
  return (
    <div className="landing">
      <div className="landingHeader">
        <div className="landingHeaderContent">
          <div className="landingHeaderTitle">
            <span className="landingTitleItem">Hangman</span>
            <span className="landingSubtitleItem">game</span>
          </div>
          <button className="landingHeaderButton" onClick={() => window.location.replace("/game")}>
            Play
          </button>
        </div>
      </div>
      <div className="landingMain">
        <div className="landingAbout">
          <h3>About</h3>
          <p>
            Hangman is a paper and pencil guessing game for two or more players. One player thinks of a word, phrase or sentence and the other(s) tries to guess
            it by suggesting letters within a certain number of guesses.
          </p>
          <p>
            Though the origins of the game are unknown, a variant is mentioned in a book of children's games assembled by Alice Gomme in 1894 called Birds,
            Beasts, and Fishes. This version lacks the image of a hanged man, instead relying on keeping score as to the number of attempts it took each player
            to fill in the blanks.
          </p>
          <button className="landingAboutButton" onClick={() => window.open("https://en.wikipedia.org/wiki/Hangman_(game)", "_blank")}>
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};
