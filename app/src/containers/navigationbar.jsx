import React, {Component} from "react";
import { Link } from "react-router-dom";

import "./navigationbar.styl";

export default class Footer extends Component {
  
  render() {
    return (
      <div className="navigation__container">
        <Link to="/" className="navigation__link">Esports Codetest</Link>
        <Link to="/teams" className="navigation__link">Teams</Link>
        <Link to="/members" className="navigation__link">Members</Link>
      </div>
    );
  }
}