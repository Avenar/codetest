import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./teams.styl";

export default class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/teams").then((resp) => {
      this.setState({ teams: resp.data });
    });
  }
  render() {
    const teams_render = [];
    
    for (const team of this.state.teams) {
      if (!team) continue;
      let members = [];
      for (const member of team.members) {
        members.push(
          <div className="teams__list__entry__member" key={"member" + member.member_id}>
            <div className="teams__list__entry__member__name">
              Name: {member.name || member.member_id}
            </div>
            <div className="teams__list__entry__member__position">
              Position: {member.position}
            </div>
          </div>
        );
      }
      teams_render.push(
        <div className="teams__list__entry" key={"team" + team.id}>
          <div className="teams__list__entry__title">
            <span>
              {team.title}
            </span>
            <Link to={`/team/${team.id}/edit`} className="teams__button-edit">
              Edit
            </Link>
          </div>
          <div className="teams__list__entry__members">
            {members}
          </div>
        </div>
      );
    }
    
    return (
      <div className="teams__background">
        <div className="teams__header">
          All available teams in the system is shown below.
        </div>
        <div className="teams__list">
          {teams_render}
        </div>
        <Link to="/team/create" className="teams__button-add">
          + Create team
        </Link>
      </div>
    );
  }
}
