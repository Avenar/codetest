
export default function(server, db) {
  //// Basic CRUD calls
  
  // Create member
  server.put("/member", async (req, res) => {
    let new_member_data = req.body;
    
    // TODO: validate inputs
    
    if(db("create", "member", new_member_data)) {
      res.json("success");
    } else {
      res.status(400).json({message:"Failed creating member.", status_code: 123});
    }
  });
  
  // Read member
  server.get("/member/:id", async (req, res) => {
    
    // TODO: validate id
  
    let return_data = await db("read", "member", req.params.id);
    
    if (return_data) {
      res.json(return_data);
    } else {
      res.status(400).json({message:"Failed finding member with id: " + req.params.id, status_code: 234});
    }
  });
  
  // Read all members
  server.get("/members", async (req, res) => {
    let return_data = await db("read", "members");
    if (return_data) {
      res.json(return_data);
    } else {
      res.status(400).json({message:"Failed getting members", status_code: 345});
    }
  });
  
  // Update member
  server.post("/member/:id", async (req, res) => {
    let update_member_data = req.body;
    
    // TODO: validate inputs
    
    if(db("update", "member", update_member_data)) {
      res.json("success");
    } else {
      res.status(400).json({message:"Failed updating member.", status_code: 456});
    }
  });
  
  // Delete member
  server.delete("/member/:id", async (req, res) => {
    
    // TODO: validate id
    
    if(db("delete", "member", req.params.id)) {
      res.json("success");
    } else {
      res.status(400).json({message:"Failed deleting member.", status_code: 567});
    }
  });
}