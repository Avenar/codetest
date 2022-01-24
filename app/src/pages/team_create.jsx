import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./team_create.styl";

const TeamCreate = () => {
  let initialstate = [];
  const[members, setState]=useState(initialstate);
  const navigate = useNavigate();
  
  const doSaveTeam = (e) => {
    e.preventDefault();
    let form = e.target;
    /*
    let changed_members = [];
    let counter = 0;
    for (const member of form["members[]"]) {
      changed_members.push({
        member_id: parseInt(member.value, 10),
        position: form["member_position[]"][counter].value,
        from: new Date(form["member_from[]"][counter].value),
        to: (form["member_to[]"][counter].value ? new Date(form["member_positions[]"][counter].value) : null)
      });
      ++counter;
    }
    */
    let data = {
      title: form.title.value,
      members: members
    };
    axios.put("http://localhost:5000/team", data).then((resp) => {
      navigate("/teams");
    });
  }
  
  let team_render;

  let members_form = [];
  for (const member of members) {
    members_form.push(
      <div className="team-create__form__member" key={member.member_id}>
        <input type="hidden" name="members[]" value={member.member_id} />
        <div className="team-create__form__member__name">
          {member.name}
        </div>
        <input type="text" name="member_position[]" defaultValue={member.position} />
        <input type="text" name="member_from[]" defaultValue={member.from} />
        <input type="text" name="member_to[]" defaultValue={member.to} />
      </div>
    );
  }
  team_render = (
    <div className="team-create__form">
      <form name="create_team" onSubmit={doSaveTeam} >
        <label htmlFor="title">Title:</label>
        <input name="title" type="text" />
        {members_form}
        <div className="team-create__controls">
          <Link to="/teams" className="team-create__button-cancel">
            - Cancel
          </Link>
          <input type="submit" name="submit" value="+ Save" className="team-create__button-save"/>
        </div>
      </form>
    </div>
  );
  
  return (
    <div className="team-create__background">
      <div className="team-create__header">
        Create team:
      </div>
      <div className="team-create__display">
        {team_render}
      </div>
    </div>
  );
}
export default TeamCreate;