// no IE support

export function get_person_name_by_id(state, id) {
  return state.persons.find(el => el.id == id).name;
}

export function get_skill_name_by_id(state, id) {
  return state.skills.find(el => el.id == id).name;
}

export function get_level_name_by_id(state, id) {
  return state.levels.find(el => el.id == id).name;
}

export function get_param_name_by_id(state, id, table_name) {
  return state[table_name].find(el => el.id == id).name;
}


export function person_health(persons_skills, person_id) {
  // debugger;
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
