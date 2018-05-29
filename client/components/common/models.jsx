// Should be valid JSON, otherwise localStorage did not updated.
let fixture = {
  "roles": [ "Developer", "DevOPS", "QA", "Architect", "Lead", "Product_Owner", "Project_Coordinator" , "Team_Coordinator"],
  "persons": [ "Vladas" , "Indra" ,"Alex Koval" ],
  "skills": [ "Javascript" , "Python" , "Django" , "React" , "Redux" , "Php" , "Communication" , "Initiative" , "Devops Architecture" , "Delivery in time" , "Architecture" ],
  "teams": [ "Web development", "DevOPS" ],
  "levels": [ "Good" ,"Need Improve" ],
  "weaknesses": ["Architecture" , "No lean approach" , "Stubborn sometimes" ],
  "strengths": [ "Openness" , "Deep thinking" , "Experience" ]
}

export function initDb() {
  // alasql('DROP DATABASE DB');
  // alasql('CREATE localStorage DATABASE IF NOT EXISTS DB');
  // alasql('ATTACH localStorage DATABASE DB AS myDB');

  alasql('CREATE  DATABASE  DB');

  let baseTables = ['roles', 'persons', 'skills', 'teams', 'levels', 'weaknesses', 'strengths']

  baseTables.forEach((table_name) => {
    alasql(`CREATE TABLE IF NOT EXISTS DB.${table_name} (id INT IDENTITY, name STRING)`);
    let insertBlock = "('" + fixture[table_name].join("'),('") + "')"
    alasql(`INSERT INTO DB.${table_name} (name) VALUES ${insertBlock}`)
  })

  alasql("CREATE TABLE IF NOT EXISTS DB.persons_teams (id INT IDENTITY, person_id INT, team_id INT)");
  alasql(`INSERT INTO DB.persons_teams (name) VALUES (1, 1), (2, 1), (3, 2)`)

  alasql("CREATE TABLE IF NOT EXISTS DB.persons_skills (id INT IDENTITY, person_id INT, skill_id INT, level_id INT)");
  alasql(`INSERT INTO DB.persons_skills (name) VALUES (1, 1, 1), (1, 4, 2), (1, 5, 2), (1, 7, 2), (2, 1, 1), (2, 4, 2), (3, 9, 1), (3, 10, 2)`)

  alasql("CREATE TABLE IF NOT EXISTS DB.persons_strengths (id INT IDENTITY, person_id INT, param_id INT)");
  alasql(`INSERT INTO DB.persons_strengths (name) VALUES (1, 1), (2, 2), (3, 3)`)

  alasql("CREATE TABLE IF NOT EXISTS DB.persons_weaknesses (id INT IDENTITY, person_id INT, param_id INT)");
  alasql(`INSERT INTO DB.persons_weaknesses (name) VALUES (1, 1), (2, 2), (3, 3)`)
}



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
