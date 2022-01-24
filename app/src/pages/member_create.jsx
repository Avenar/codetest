import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./member_create.styl";

const MemberCreate = () => {
  const navigate = useNavigate();
  
  const doSaveMember = (e) => {
    e.preventDefault();
    let form = e.target;
    let data = {
      nickname: form.nickname.value,
      name: form.name.value
    };
    axios.put(`http://localhost:5000/member`, data).then((resp) => {
      navigate("/members");
    });
  }
  
  let member_render = (
    <div className="member-create__form">
      <form name="create_member" onSubmit={doSaveMember} >
        <label htmlFor="nickname">Nickname:</label>
        <input name="nickname" type="text" />
        <label htmlFor="name">Name:</label>
        <input name="name" type="text" />
        <div className="member-create__controls">
          <Link to="/members" className="member-create__button-cancel">
            - Cancel
          </Link>
          <input type="submit" name="submit" value="+ Save" className="member-create__button-save"/>
        </div>
      </form>
    </div>
  );
  
  return (
    <div className="member-create__background">
      <div className="member-create__header">
        Create member:
      </div>
      <div className="member-create__display">
        {member_render}
      </div>
    </div>
  );
}
export default MemberCreate;