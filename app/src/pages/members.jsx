import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./members.styl";

export default class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/members").then((resp) => {
      this.setState({ members: resp.data });
    });
  }
  render() {
    const members_render = [];
    
    for (const member of this.state.members) {
      if (!member) continue;
      members_render.push(
        <div className="members__list__entry" key={"member" + member.id}>
          <div className="members__list__entry__title">
            <span>
              {member.nickname}
            </span>
            <Link to={`/member/${member.id}/edit`} className="members__button-edit">
              Edit
            </Link>
          </div>
          <div className="members__list__entry__name">
            <span>
              {member.name}
            </span>
          </div>
        </div>
      );
    }
    
    return (
      <div className="members__background">
        <div className="members__header">
          All available members in the system is shown below.
        </div>
        <div className="members__list">
          {members_render}
        </div>
        <Link to="/member/create" className="members__button-add">
          + Create member
        </Link>
      </div>
    );
  }
}
