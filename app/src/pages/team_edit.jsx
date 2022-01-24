import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./team_edit.styl";

const TeamEdit = () => {
  let initialstate = {
    team: null,
    members: null
  };
  const[data, setState]=useState(initialstate);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const doDeleteTeam = () => {
    axios.delete(`http://localhost:5000/team/${id}`).then((resp) => {
      navigate("/teams");
    });
  }
  
  const doRemoveMember = (id) => {
    let counter = 0;
    let new_team = Object.assign({}, data.team);
    for (const member of new_team.members) {
      if (member.member_id == id) {
        new_team.members.splice(counter, 1);
        break;
      }
      ++counter;
    }
    setState({team: new_team, members: data.members});
  }
  
  const doAddMember = (index) => {
    let counter = 0;
    let new_team = Object.assign({}, data.team);
    let add_member = {
      member_id: data.members[index].id,
      name: data.members[index].nickname,
      position: "member",
      from: new Date(),
      to: null
    };
    new_team.members.push(add_member);
    setState({team: new_team, members: data.members});
  }
  
  const doSaveTeam = (e) => {
    e.preventDefault();
    let form = e.target;
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
    
    let data = {
      id: parseInt(form.id.value, 10),
      payload: {
        id: parseInt(form.id.value, 10),
        title: form.title.value,
        members: changed_members
      }
    };
    axios.post(`http://localhost:5000/team/${form.id.value}`, data).then((resp) => {
      navigate("/teams");
    });
  }
  
  let members_render;

  let team_render;
  
  if (data.team == null) {
    team_render = (
      <div>
        Loading team...
      </div>
    );
    axios.get(`http://localhost:5000/team/${id}`).then((resp) => {
      setState({team: resp.data});
    });
  } else {
    if (data.members == null) {
      members_render = (
        <div>
          Loading members...
        </div>
      );
      axios.get(`http://localhost:5000/members`).then((resp) => {
        setState({team: data.team, members: resp.data});
      });
    } else {
      let members_render_inner = [];
      members_render_inner.push(
        <option selected disabled key="-1">Select a member to add them</option>
      );
      let counter = 0;
      for (const member of data.members) {
        let not_added = true;
        for (const team_member of data.team.members) {
          if (team_member.member_id == member.id) {
            not_added = false;
          }
        }
        if (not_added) {
          members_render_inner.push(
            <option key={`option${member.id}`} value={counter}>
              + Add player: {member.nickname}
            </option>
          );
        }
        ++counter;
      }
      members_render = (
        <div className="team-edit__dropdown">
          <select name="members_list" onChange={(e) => doAddMember(e.target.value)}>
            {members_render_inner}
          </select>
        </div>
      );
    }
    let members_form = [];
    for (const member of data.team.members) {
      members_form.push(
        <div className="edit-team__form__member" key={member.member_id}>
          <input type="hidden" name="members[]" value={member.member_id} />
          <div className="edit-team__form__member__name">
            {member.name}
          </div>
          <input type="text" name="member_position[]" defaultValue={member.position} />
          <input type="text" name="member_from[]" defaultValue={member.from} />
          <input type="text" name="member_to[]" defaultValue={member.to} />
          <div className="team-edit__button-remove" onClick={() => doRemoveMember(member.member_id)}>
            - Remove
          </div>
        </div>
      );
    }
    team_render = (
      <div className="team-edit__form">
        <form name="edit_team" onSubmit={doSaveTeam} >
          <input type="hidden" value={id} name="id" />
          <label htmlFor="title">Title:</label>
          <input name="title" type="text" defaultValue={data.team.title} />
          {members_form}
          <div className="team-edit__extra-members">
            {members_render}
          </div>
          <div className="team-edit__controls">
            <Link to="/teams" className="team-edit__button-cancel">
              - Cancel
            </Link>
            <input type="submit" name="submit" value="+ Save" className="team-edit__button-save"/>
            <div className="team-edit__button-delete" onClick={doDeleteTeam}>
              x Delete
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <div className="team-edit__background">
      <div className="team-edit__header">
        Edit team:
      </div>
      <div className="team-edit__display">
        {team_render}
      </div>
    </div>
  );
}
export default TeamEdit;