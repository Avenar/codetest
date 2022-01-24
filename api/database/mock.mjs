const mock_data = {
  teams_uid_counter: 2,
  members_uid_counter: 6,
  teams: [
    {
      id: 0,
      title: "The black jackets",
      members: [
        {
          member_id: 0,
          position: "leader",
          from: new Date("2021-01-01"),
          to: null
        },
        {
          member_id: 2,
          position: "member",
          from: new Date("2021-01-01"),
          to: null
        },
        {
          member_id: 4,
          position: "member",
          from: new Date("2021-01-01"),
          to: null
        }
      ],
    },
    {
      id: 1,
      title: "The white coats",
      members: [
        {
          member_id: 1,
          position: "leader",
          from: new Date("2021-01-01"),
          to: null
        },
        {
          member_id: 3,
          position: "member",
          from: new Date("2021-01-01"),
          to: null
        },
        {
          member_id: 5,
          position: "member",
          from: new Date("2021-01-01"),
          to: null
        }
      ],
    }
  ],
  members: [
    {
      id: 0,
      nickname: "Green Hornet",
      name: "John Doe",
    },
    {
      id: 1,
      nickname: "Blue Mamba",
      name: "John Deer",
    },
    {
      id: 2,
      nickname: "Yellow Milkdud",
      name: "John Anderson",
    },
    {
      id: 3,
      nickname: "Purple Spice",
      name: "John Stag",
    },
    {
      id: 4,
      nickname: "Red Yoshi",
      name: "John Snow",
    },
    {
      id: 5,
      nickname: "Rainbow Jack",
      name: "John Wolfe",
    },
  ]
};

export function db(operation, qualifier, data = null) {
  switch(operation) {
    case "create":
      switch(qualifier) {
        case "team":
          // add new id to data
          data.id = mock_data.teams_uid_counter;
          // insert at valid index
          mock_data.teams[mock_data.teams_uid_counter++] = data;
          return true;
          break;
        case "member":
          // add new id to data
          data.id = mock_data.members_uid_counter;
          // insert at valid index
          mock_data.members[mock_data.members_uid_counter++] = data;
          return true;
          break;
        default:
          return false;
      };
      break;
    case "read":
      switch(qualifier) {
        case "team":
          return mock_data.teams[data];
          break;
        case "teams":
          return mock_data.teams;
          break;
        case "member":
          return mock_data.members[data];
          break;
        case "members":
          return mock_data.members;
          break;
        default:
          return false;
      };
      break;
    case "update":
      switch(qualifier) {
        case "team":
          mock_data.teams[data.id] = data.payload;
          return true;
          break;
        case "member":
          mock_data.members[data.id] = data.payload;
          return true;
          break;
        default:
          return false;
      };
      break;
    case "delete":
      switch(qualifier) {
        case "team":
          delete mock_data.teams[data];
          return true;
          break;
        case "member":
          delete mock_data.members[data];
          return true;
          break;
        default:
          return false;
      };
      break;
    default:
      return false;
  };
}