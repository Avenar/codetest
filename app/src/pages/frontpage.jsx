import React, {Component} from "react";
import "./frontpage.styl";

export default class Frontpage extends Component {
  
  render() {
    
    return (
      <div className="frontpage__background">
        <div className="frontpage__intro-text">
          <p>
            Welcome to the totally awesome codetest for esports tournaments. Above, in the navigation bar, you can navigate to other parts of the system. Please enjoy! Also below there will be som ipsum lorem to pad the way this looks!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam facilisis metus vitae tincidunt tristique. Duis et rutrum augue. Suspendisse potenti. In sodales porttitor lobortis. Morbi sollicitudin sapien tellus, a convallis lectus iaculis vitae. Ut a congue nibh. Fusce lacus urna, egestas vitae erat eu, tempus pellentesque lorem. Integer sit amet nisi massa. Nunc convallis nisi ligula, eget vulputate urna tempus non. Pellentesque eu elit ac quam consectetur condimentum eget non dolor. Nam ante massa, molestie sed porttitor nec, efficitur vitae nulla. Suspendisse potenti.
          </p>
          <p>
            Nulla sodales tempus imperdiet. Donec eu tortor metus. Nulla facilisi. Donec ac lobortis ex. Quisque consectetur nibh nec urna laoreet, id tempus purus eleifend. Praesent aliquet finibus augue, ac finibus magna ultricies et. Fusce eu ornare velit. Nunc ac massa augue. Mauris dignissim tincidunt rutrum. Donec volutpat erat diam, vel vehicula erat ultricies ac. Integer semper odio id ultrices consectetur. Integer a consectetur justo, eu accumsan ante. Suspendisse placerat magna id metus varius, sit amet fermentum tellus sollicitudin. Sed consectetur nunc quis mi venenatis tristique.
          </p>
        </div>
      </div>
    );
  }
}
