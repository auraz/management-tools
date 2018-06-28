import _ from 'lodash'
/*
Extract roles per team from teams_roles resource embedding database query result.

Convert

  [
    {
        "id": 8,
        "roles": {
            "id": 45,
            "name": "Junior Front-end Developer                        "
        },
        "teams": {
            "id": 9,
            "name": "Web development                                   "
        }
    }
]

to Teams:
  {
    9: {
      name: Web development,
      roles: [{ id: 45, name: Junior Front-end Developer                        }, ...]
    },
    10: {
      name: A,
      roles: [{ id: 11, name: Y }, {} ]
    }
  }

  via

  [{
    id: 9:
    name: Web development,
    roles:[{ id: 45, name: Junior Front-end Developer                        } ]
  },{
   id: 10
   name: A,
   roles: [{ id: 11, name: Y }, {} ]
  }
  ]
*/
export function prepareTeamsRoles(data) {
  let intermediate = {};
  _.forEach(data, function(value) {
    if (!_.has(intermediate, value.teams.id)) {
        intermediate[value.teams.id] = { name: value.teams.name, roles: [] };
        intermediate[value.teams.id].roles.push({ id: [value.roles.id], name: value.roles.name});
    }
    else {
      if (!_has(intermediate[value.teams.id].roles, value.roles.id)) {
        intermediate[value.teams.id].roles.push({ id: [value.roles.id], name: value.roles.name});
      }
    }
  })
  // Convert intermediate object to teams structure
  let teams = [];
  _.forOwn(intermediate, function(value, key) {
    teams.push( { id: key, name: value.name, roles: _.uniqBy(value.roles, 'id')})
  } );
  return teams
}
