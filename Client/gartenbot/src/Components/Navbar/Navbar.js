//Beim component reload checken ob user eingeloggt
import "./Navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    //toggle navigation button on mobile view
    const [isActive, setIsActive] = useState(false);
    const handleOnClick = () => {
        setIsActive(!isActive);
    };

    const handleOnCheck = (e) => {
        isActive ? setIsActive(false) : setIsActive(true);
    }

    return (
        <div>
            <nav className="navbar non-printable">

                <div>
                    <li className="brand-title gradient"><Link to="/">Gartenbot</Link></li>
                </div>

                <a href="#" className="toggle-button" onClick={() => handleOnClick()}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
                <div className={isActive ? "navbar-links active" : "navbar-links"}>
                    <ul>
                        

                        <li>
                            <Link to="/" onClick={() => handleOnCheck()}>
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to="/settings" onClick={() => handleOnCheck()}>
                                Einstellungen
                            </Link>
                        </li>

                        <li>
                            <Link to="/handout" onClick={() => handleOnCheck()}>
                                Platzhalter
                            </Link>
                        </li>


                    </ul>
                </div>
            </nav>
        </div>
    );
};
export default Navbar;