import jsonQ from 'jsonq'
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

to

  [
    { team: 9, roles: [8] },
    { team: 10, roles: [8, 9] },
  ]
*/
export function prepareTeamsRoles(data) {
  let teamsRoles = jsonQ(data);
  let teamsIds = teamsRoles.find('teams').find('id').value()
  console.log(teamsIds);
  return [
    { team: 9, roles: [8] },
    { team: 10, roles: [8, 9] },
  ]
}
