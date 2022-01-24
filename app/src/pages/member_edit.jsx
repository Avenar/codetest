import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./member_edit.styl";

const MemberEdit = () => {
  let initialstate = null;
  const[member, setState]=useState(initialstate);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const doDeleteMember = () => {
    axios.delete(`http://localhost:5000/member/${id}`).then((resp) => {
      navigate("/members");
    });
  }
  
  const doSaveMember = (e) => {
    e.preventDefault();
    let form = e.target;
    let data = {
      id: parseInt(form.id.value, 10),
      payload: {
        id: parseInt(form.id.value, 10),
        nickname: form.nickname.value,
        name: form.name.value,
      }
    };
    axios.post(`http://localhost:5000/member/${form.id.value}`, data).then((resp) => {
      navigate("/members");
    });
  }
  
  let member_render;
  
  if (member == null) {    
    member_render = (
      <div>
        Loading member...
      </div>
    );
    axios.get(`http://localhost:5000/member/${id}`).then((resp) => {
      setState(resp.data);
    });
  } else {
    member_render = (
      <div className="member-edit__form">
        <form name="edit_member" onSubmit={doSaveMember} >
          <input type="hidden" value={id} name="id" />
          <label htmlFor="nickname">Nickname:</label>
          <input name="nickname" type="text" defaultValue={member.nickname} />
          <label htmlFor="name">Name:</label>
          <input name="name" type="text" defaultValue={member.name} />
          <div className="member-edit__controls">
            <Link to="/members" className="member-edit__button-cancel">
              - Cancel
            </Link>
            <input type="submit" name="submit" value="+ Save" className="member-edit__button-save"/>
            <div className="member-edit__button-delete" onClick={doDeleteMember}>
              x Delete
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <div className="member-edit__background">
      <div className="member-edit__header">
        Edit member:
      </div>
      <div className="member-edit__display">
        {member_render}
      </div>
    </div>
  );
}
export default MemberEdit;