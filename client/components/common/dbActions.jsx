export function fetchTeam(id) {
  let payload = alasql(`SELECT * FROM DB.teams WHERE id=${id}`)[0];
  return payload
  // return dispatch => { return {type: "FETCH_TEAM", payload: payload} }
}

export function fetchTeams() {
  let payload = alasql("SELECT * FROM DB.teams");
  return payload
  // return dispatch => { return {type: "FETCH_TEAMS", payload: payload} }
}

export function fetchPersonsInTeam(team_id) {
  let payload = alasql(`SELECT person_id, name FROM DB.persons_teams JOIN DB.persons ON persons_teams.person_id = persons.id WHERE team_id=${team_id}`);
  return payload
  // return dispatch => { return {type: "FETCH_PERSONS_IN_TEAM", payload: payload} }
}


export function udpateModelName(model, data) {
  let payload = alasql(`UPDATE ${model} SET name=${data.name} WHERE id=${data.id}`);
  return payload
}
