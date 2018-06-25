import{ jsonQ } from 'jsonq'
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


*/
export function prepareTeamsRoles(data) {
  let teamsRoles = jsonQ(data);
  let teamsIds =teamsROles.find('teams', () =>this.id );
  console.log(teamsIds);
}
