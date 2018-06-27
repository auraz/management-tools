import jsonQ from 'jsonq'
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
      roles: { id: 45, name: Junior Front-end Developer                        }
    },
    10: {
      name: A,
      roles: { id: 11, name: Y }
    }
  }

  via

  [{
    id: 9:
    name: Web development,
    roles: { id: 45, name: Junior Front-end Developer                        }
  },{
   id: 10
   name: A,
   roles: { id: 11, name: Y }
  }
  ]
*/
export function prepareTeamsRoles(data) {
  let intermediate = {};
  _.forEach(data, function(value) {
    if (!_.has(intermediate, value.teams.id)) {
        intermediate[value.teams.id] = { name: value.teams.name, roles: {} };
        intermediate[value.teams.id].roles[value.roles.id] = value.roles.name;
    }
    else {
      if (!_has(intermediate[value.teams.id].roles, value.roles.id)) {
        intermediate[value.teams.id].roles[value.roles.id] = value.roles.name;
      }
    }
  })
  // Convert intermediate object to teams structure
  let teams = [];
  _.forOwn(intermediate, function(value, key) {
    teams.push( { id: key, name: value.name, roles: value.roles})
  } );

  return teams
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
