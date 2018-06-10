// Should be valid JSON, otherwise localStorage did not updated.
let fixture = {
  "roles": [ "Developer", "DevOPS", "QA", "Architect", "Lead", "Product_Owner", "Project_Coordinator" , "Team_Coordinator"],
  "persons": [ "Vladas" , "Indra" ,"Alex Koval" ],
  "skills": [ "Javascript" , "Python" , "Django" , "React" , "Redux" , "Php" , "Communication" , "Initiative" , "Devops Architecture" , "Delivery in time" , "Architecture" ],
  "teams": ["Web development", "DevOPS" ],
  "levels": [ "Good" ,"Need Improve" ],
  "params": ["Architecture" , "No lean approach" , "Stubborn sometimes", "Openness" , "Deep thinking" , "Experience" ],
}

export function initDb() {
  // alasql('DROP DATABASE DB');
  // alasql('CREATE localStorage DATABASE IF NOT EXISTS DB');
  // alasql('ATTACH localStorage DATABASE DB AS myDB');

  alasql('CREATE  DATABASE  DB');

  let baseTables = ['roles', 'persons', 'skills', 'teams', 'levels', 'params']

  baseTables.forEach((table_name) => {
    alasql(`CREATE TABLE IF NOT EXISTS DB.${table_name} (id INT IDENTITY, name STRING)`);
    let insertBlock = "('" + fixture[table_name].join("'),('") + "')"
    alasql(`INSERT INTO DB.${table_name} (name) VALUES ${insertBlock}`)
  })

  alasql("CREATE TABLE IF NOT EXISTS DB.persons_teams (id INT IDENTITY, person_id INT, team_id INT)");
  alasql(`INSERT INTO DB.persons_teams (person_id, team_id) VALUES (1, 1), (2, 1), (3, 2)`)

  alasql("CREATE TABLE IF NOT EXISTS DB.persons_skills (id INT IDENTITY, person_id INT, skill_id INT, level_id INT)");
  alasql(`INSERT INTO DB.persons_skills (person_id, skill_id, level_id) VALUES (1, 1, 1), (1, 4, 2), (1, 5, 2), (1, 7, 2), (2, 1, 1), (2, 4, 2), (3, 9, 1), (3, 10, 2)`)

  alasql("CREATE TABLE IF NOT EXISTS DB.persons_strengths (id INT IDENTITY, person_id INT, param_id INT)");
  alasql(`INSERT INTO DB.persons_strengths (person_id, param_id) VALUES (1, 4), (2, 5), (3, 6)`)

  alasql("CREATE TABLE IF NOT EXISTS DB.persons_weaknesses (id INT IDENTITY, person_id INT, param_id INT)");
  alasql(`INSERT INTO DB.persons_weaknesses (person_id, param_id) VALUES (1, 1), (2, 2), (3, 3)`)

  alasql("CREATE TABLE IF NOT EXISTS DB.teams_roles (id INT IDENTITY, team_id INT, role_id INT)");
  alasql(`INSERT INTO DB.teams_roles (team_id, role_id) VALUES (1, 1), (1, 3), (2, 2)`)

 alasql("CREATE TABLE IF NOT EXISTS DB.persons_roles (id INT IDENTITY, person_id INT, role_id INT)");
  alasql(`INSERT INTO DB.persons_roles (person_id, role_id) VALUES (1, 1), (1, 3), (2, 2)`)

  alasql("CREATE TABLE IF NOT EXISTS DB.persons_teams_roles (id INT IDENTITY, person_id INT, role_id INT, team_id INT)");
  alasql(`INSERT INTO DB.persons_teams_roles (person_id, role_id, team_id) VALUES (1, 1, 1), (1, 2, 1), (2, 3, 2), (2, 4, 2)`)
}

export function fetchModel(model, id) {
  return alasql(`SELECT * FROM DB.${model} WHERE id=${id}`)[0];
}

export function fetchModelAll(model) {
  return alasql(`SELECT * FROM DB.${model}`);
}

export function fetchPersonsInTeam(team_id) {
  return alasql(`SELECT person_id as id, name FROM DB.persons_teams JOIN DB.persons ON persons_teams.person_id = persons.id WHERE team_id=${team_id}`);
}

export function fetchPersonParam(param_type, person_id) {
  return alasql(`SELECT param_id as id, name FROM DB.persons_${param_type} JOIN DB.params ON persons_${param_type}.param_id = params.id WHERE person_id=${person_id}`);
}

export function fetchPersonSkills(person_id) {
  return alasql(`SELECT ps.skill_id as skill_id, l.name as level_name, s.name as skill_name FROM DB.persons_skills ps JOIN DB.persons p ON ps.person_id = p.id JOIN DB.skills s ON s.id=ps.skill_id JOIN DB.levels l ON l.id=ps.level_id WHERE person_id=${person_id}`);
}

export function fetchTeamsRoles(team_id) {
  return alasql(`SELECT tr.role_id as id, r.name as name, tr.id as index_id FROM DB.teams_roles tr JOIN DB.roles r ON tr.role_id = r.id WHERE team_id=${team_id}`);
}

export function fetchPersonsRoles(person_id) {
  return alasql(`SELECT tr.role_id as id, r.name as name FROM DB.persons_roles tr JOIN DB.roles r ON tr.role_id = r.id WHERE person_id=${person_id}`);
}

export function fetchPersonsTeamsRoles(person_id, team_id) {
    return alasql(`SELECT ptr.role_id as id, r.name as name FROM DB.persons_teams_roles ptr JOIN DB.roles r ON ptr.role_id = r.id WHERE person_id=${person_id} AND team_id=${team_id}`);
}

export function updateModelName(model, id, name) {
  return alasql(`UPDATE DB.${model} SET name='${name}' WHERE id=${id}`);
}

export function insertBaseModel(model, name) {
  return alasql(`INSERT INTO DB.${model} VALUE {name:?}`, name);
}

export function attachSkillPerson(skill_id, person_id) {
  return alasql("INSERT INTO DB.persons_skills VALUE {person_id:?, skill_id:?, level_id:1}", [person_id, skill_id]);
}

export function attachParamPerson(param_type, param_id, person_id) {
  return alasql(`INSERT INTO DB.persons_${param_type} VALUE {param_id:?, person_id:?}`, [param_id, person_id]);
}

export function attachTeamRole(role_id, team_id) {
  return alasql("INSERT INTO DB.teams_roles VALUE {role_id:?, team_id:?}", [role_id, team_id]);
}

export function attachPersonRole(role_id, person_id) {
  return alasql("INSERT INTO DB.persons_roles VALUE {role_id:?, person_id:?}", [role_id, person_id]);
}

export function attachPersonTeam(person_id, team_id) {
  return alasql("INSERT INTO DB.persons_teams VALUE {person_id:?, team_id:?}", [person_id, team_id]);
}

export function deleteRowFromModel(model, id) {
  return alasql(`DELETE FROM DB.${model} WHERE id=?`, id);
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
