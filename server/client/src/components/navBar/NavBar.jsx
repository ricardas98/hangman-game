import logoBlack from "../../images/logo-black.svg";

import "./NavBar.css";

export const NavBar = () => {
  console.log();
  return (
    <div className="navBar">
      <div className="navBarContent">
        <div className="navBarLeft">
          <div className="navBarLeftItem"></div>
          <div className="navBarLeftItem">
            <span className="navBarTitle">Hangman</span>
          </div>
        </div>

        {/*<span className="navBarButton">Play</span>*/}
      </div>
    </div>
  );
};
