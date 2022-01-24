import React, {Component} from "react";

import "./app.styl";

import NavigationBar from "./containers/navigationbar.jsx";
import Footer from "./containers/footerbar.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base__container">
        <NavigationBar />
        <div className="content__container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
