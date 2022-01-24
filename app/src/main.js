import React from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import App from "./app.jsx";
import Frontpage from "./pages/frontpage.jsx";
import Teams from "./pages/teams.jsx";
import TeamEdit from "./pages/team_edit.jsx";
import TeamCreate from "./pages/team_create.jsx";
import Members from "./pages/members.jsx";
import MemberEdit from "./pages/member_edit.jsx";
import MemberCreate from "./pages/member_create.jsx";

ReactDOM.render(
  <Router>
    <App>
      <Routes>
        <Route exact path='/' element={<Frontpage />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/team'>
          <Route path=':id/edit' element={<TeamEdit />} />
          <Route path='create' element={<TeamCreate />} />
        </Route>
        <Route path='/members' element={<Members />} />
        <Route path='/member'>
          <Route path=':id/edit' element={<MemberEdit />} />
          <Route path='create' element={<MemberCreate />} />
        </Route>
      </Routes>
    </App>
  </Router>,
  document.getElementById('app')
);