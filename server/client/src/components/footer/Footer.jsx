import logoLight from "../../images/logo-light.svg";

import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContent">
        <div className="footerLeft">
          <img src={logoLight} alt="logoLight" className="footerLogo" />
          <span className="footerTitle">Hangman</span>
        </div>
        <div className="footerRight">
          <span className="footerText">Ricardas98. 2021.</span>
          <button className="buttonTransparent" onClick={() => window.open("https://github.com/ricardas98/hangman-game", "_blank")}>
            <span className="footerText">
              <i class="fab fa-github fa-lg"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
