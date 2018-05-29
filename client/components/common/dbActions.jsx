
export function fetchModel(model, id) {
  return alasql(`SELECT * FROM DB.${model} WHERE id=${id}`)[0];
}

export function fetchModelAll(model) {
  return alasql(`SELECT * FROM DB.${model}`);
}

export function fetchPersonsInTeam(team_id) {
  return alasql(`SELECT person_id, name FROM DB.persons_teams JOIN DB.persons ON persons_teams.person_id = persons.id WHERE team_id=${team_id}`);
}

export function updateModelName(model, id, name) {
  return alasql(`UPDATE DB.${model} SET name=${name} WHERE id=${id}`);
}

export function insertTeam(team_name) {
  // debugger;
  return alasql(`INSERT INTO DB.teams VALUE {name:?}`, team_name);
}
