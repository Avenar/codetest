
export default function(server, db) {
  //// Basic CRUD calls
  
  // Create team
  server.put("/team", async (req, res) => {
    let new_team_data = req.body;
    
    // TODO: validate inputs
    
    if(db("create", "team", new_team_data)) {
      res.json("success");
    } else {
      res.status(400).json({message:"Failed creating team.", status_code: 123});
    }
  });
  
  // Read team
  server.get("/team/:id", async (req, res) => {
    
    // TODO: validate id
  
    let return_data = await db("read", "team", req.params.id);
    
    if (return_data) {
      res.json(return_data);
    } else {
      res.status(400).json({message:"Failed finding team with id: " + req.params.id, status_code: 234});
    }
  });
  
  // Read all teams
  server.get("/teams", async (req, res) => {
    let return_data = await db("read", "teams");
    for (const team of return_data) {
      team.members.forEach((team_member, i) => {
        let member = db("read", "member", team_member.member_id);
        if (member) {
          return_data[team.id].members[i].name = member.nickname;
        } else {
          return_data[team.id].members.splice(i, 1);
        }
      });
    }
    if (return_data) {
      res.json(return_data);
    } else {
      res.status(400).json({message:"Failed getting teams", status_code: 345});
    }
  });
  
  // Update team
  server.post("/team/:id", async (req, res) => {
    let update_team_data = req.body;
    
    // TODO: validate inputs
    
    if(db("update", "team", update_team_data)) {
      res.json("success");
    } else {
      res.status(400).json({message:"Failed updating team.", status_code: 456});
    }
  });
  
  // Delete team
  server.delete("/team/:id", async (req, res) => {
    
    // TODO: validate id
    
    if(db("delete", "team", req.params.id)) {
      res.json("success");
    } else {
      res.status(400).json({message:"Failed deleting team.", status_code: 567});
    }
  });
}