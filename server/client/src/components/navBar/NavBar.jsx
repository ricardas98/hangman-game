import "./NavBar.css";

export const NavBar = () => {
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
