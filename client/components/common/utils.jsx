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
  return {
    TeamsRoles: [
    { team: 9, roles: [8] },
    { team: 10, roles: [8, 9] }
  ]}
}


export function person_health(persons_skills, person_id) {
  let person_skills = persons_skills.filter(el => el.person_id == person_id)
  let total_good_skills = person_skills.filter(el => el.level_id == 1).length
  let health = total_good_skills / person_skills.length;
  return health;
}


export function team_health(persons_teams, persons_skills, team_id) {
  let list_of_person_ids = persons_teams.filter(el => el.team_id == team_id).map(el => el.person_id)
  let sum_reducer = (acc, cur) => acc + cur
  let total_percentage = list_of_person_ids.map(e => person_health(persons_skills, e)).reduce(sum_reducer)
  let team_health = Math.floor( (total_percentage / list_of_person_ids.length) * 100).toFixed(0) + "%"
  return team_health
}
