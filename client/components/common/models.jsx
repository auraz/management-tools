// Should be valid JSON, otherwise localStorage did not updated.
let fixture = {
  "roles": [
    "Junior Front-end Developer", "Middle Front-end Developer", "Senior Front-end Developer",
    "Junior Back-end Developer", "Middle Back-end Developer", "Senior Back-end Developer",
    "Junior DevOps", "Middle DevOps", "Senior DevOps",
    "Junior QA", "Middle QA", "Senior QA",
    "Junior Architect", "Middle Architect", "Senior Architect",
    "Team Lead",
    "Junior Product Owner", "Middle Product Owner", "Senior Product Owner",
    "Project Coordinator" , "Team Coordinator", "Tech Lead"
  ],
  "persons": [ "Vladas" , "Indra" ,"Alex Koval", "Luky", "Oleksii", "Aldian", "Swiridow", "Elva", "Matt" ],
  "skills": [ "Javascript" , "Python" , "Django" , "React" , "Redux" , "Php" , "Communication" , "Initiative" , "Devops Architecture" , "Delivery in time" , "Architecture", "Testing", "Manual testing", "Integration testing", "Prototyping", "Communication", "Databases" ],
  "teams": ["Web development", "DevOPS" ],
  "levels": [ "Good" ,"Need Improve" ],
  "params": ["Architecture" , "No lean approach" , "Stubborn sometimes", "Openness" , "Deep thinking" , "Experience" ],
}





export function initDb() {
  // autoincrement does not work for locastorage
  // alasql('DROP localStorage DATABASE LocalStorageDB');
  // alasql('CREATE localStorage DATABASE IF NOT EXISTS LocalStorageDB');
  // alasql('ATTACH localStorage DATABASE LocalStorageDB AS DB');

  // alasql('DROP localStorage DATABASE LocalStorageDB');
  function f1(data) {
    console.log(data)
  }

  function createTables() {

    let baseTables = ['roles', 'persons', 'skills', 'teams', 'levels', 'params']

    // let baseTablesPromises = baseTables.map((table_name) => {
    //   let insertBlock = "('" + fixture[table_name].join("'),('") + "')"
    //   return alasql.promise([
    //     `CREATE TABLE IF NOT EXISTS DB.${table_name} (id INT AUTO_INCREMENT, name STRING)`,
    //     `INSERT INTO DB.${table_name} (name) VALUES ${insertBlock}`
    //   ])
    // })
    // debugger;
    baseTables.reduce(
      (promiseChain, tableName) => promiseChain.then(
          () => {
            let insertBlock = "('" + fixture[tableName].join("'),('") + "')"

            let sql1= `CREATE TABLE IF NOT EXISTS DB.${tableName} (id INT IDENTITY, name STRING)`
            let sql2 = `INSERT INTO DB.${tableName} (name) VALUES ${insertBlock}`
            console.log(sql1, sql2)
            return alasql.promise([ sql1, sql2 ])
          }
        ),
      Promise.resolve() // initial value
    ).then(console.log).catch(console.log)


    // return;
    alasql("CREATE TABLE IF NOT EXISTS DB.persons_teams (id INT IDENTITY, person_id INT, team_id INT)");
    alasql(`INSERT INTO DB.persons_teams (person_id, team_id) VALUES (1, 1), (2, 1), (3, 2), (4, 1), (5, 1), (6, 1), (7, 2), (8, 1), (9, 1)`)

    alasql("CREATE TABLE IF NOT EXISTS DB.persons_skills (id INT IDENTITY, person_id INT, skill_id INT, level_id INT)");
    alasql(`INSERT INTO DB.persons_skills (person_id, skill_id, level_id) VALUES (1, 1, 1), (1, 4, 2), (1, 5, 2), (1, 7, 2), (2, 1, 1), (2, 4, 2), (3, 9, 1), (3, 10, 2)`)

    alasql("CREATE TABLE IF NOT EXISTS DB.persons_strengths (id INT IDENTITY, person_id INT, param_id INT)");
    alasql(`INSERT INTO DB.persons_strengths (person_id, param_id) VALUES (1, 4), (2, 5), (3, 6)`)

    alasql("CREATE TABLE IF NOT EXISTS DB.persons_weaknesses (id INT IDENTITY, person_id INT, param_id INT)");
    alasql(`INSERT INTO DB.persons_weaknesses (person_id, param_id) VALUES (1, 1), (2, 2), (3, 3)`)

    alasql("CREATE TABLE IF NOT EXISTS DB.teams_roles (id INT IDENTITY, team_id INT, role_id INT)");
    alasql(`INSERT INTO DB.teams_roles (team_id, role_id) VALUES (1, 3), (1, 6), (1, 11), (1, 12), (1, 15), (1, 16), (1, 19), (2, 9), (2, 15), (2, 16)`)

   alasql("CREATE TABLE IF NOT EXISTS DB.persons_roles (id INT IDENTITY, person_id INT, role_id INT)");
    alasql(`INSERT INTO DB.persons_roles (person_id, role_id) VALUES (1, 2), (1, 5), (1, 17), ` +
      `(2, 2), (2, 6), (2, 14), (3, 1), (3, 6), (3, 8), (3, 14), (3, 16), (3, 17), ` +
      `(4, 1), (4, 4), (5, 2), (5, 6), (5, 13), (6, 2), (6, 5), (6, 17), (7, 9), (8, 12), (8, 17), (9, 17)`)

    alasql("CREATE TABLE IF NOT EXISTS DB.persons_teams_roles (id INT IDENTITY, person_id INT, role_id INT, team_id INT)");
    alasql(`INSERT INTO DB.persons_teams_roles (person_id, role_id, team_id) VALUES (1, 1, 1), (1, 2, 1), (2, 3, 2), (2, 4, 2)`)
  }


  alasql.promise('CREATE INDEXEDDB DATABASE IF NOT EXISTS DB;')
  .then( () => { console.log("Database created"); return alasql.promise('ATTACH INDEXEDDB DATABASE DB;') } )
  .then( () => { console.log("Database attached"); return alasql.promise('USE DB;') } )
  .then( () => { console.log("Database used"); createTables(); } )
  .catch(f1)

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
