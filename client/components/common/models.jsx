import axios from 'axios';


// Should be valid JSON
let jsonFixture = {
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
let baseTables = ['roles', 'persons', 'skills', 'teams', 'levels', 'params']


export const Models = {
  all: (modelName) => axios.get(`http://localhost:3000/${modelName}`),
  one: (modelName, id) => axios.get(`http://localhost:3000/${modelName}?id=eq${id}`),
  addBase: (modelName, name) => axios.post(`http://localhost:3000/${modelName}`, {"name": name}),
  // axios.get(`http://localhost:3000/teams_roles?select=role&teams.id=eq.${team_id}`);
  TeamsRoles: () => {
    return axios.get(`http://localhost:3000/teams_roles?select=id,roles(id,name),teams(id,name)`)
  },
  attachTeamRole: (role_id, team_id) => {
    return axios.post(`http://localhost:3000/teams_roles`, {"role": role_id, "team": team_id});
  }
}

export function fixturesToDb() {
  let postFixtures = async (tablename) => {
    let data = jsonFixture[tablename].map( e => ({'name': e }) )

    const r1 = await axios.delete(`http://localhost:3000/${tablename}`);
    console.log(r1, r1.data);

    const response = await axios.post(`http://localhost:3000/${tablename}`, data);
    console.log(response, response.data);
  }
  // baseTables.map( tableName => postFixtures(tableName)) // Do it only first time
};

export function fetchPersonsInTeam(team_id) {
  return alasql(`SELECT person_id as id, name FROM DB.persons_teams JOIN DB.persons ON persons_teams.person_id = persons.id WHERE team_id=${team_id}`);
}

export function fetchPersonParam(param_type, person_id) {
  return alasql(`SELECT param_id as id, name FROM DB.persons_${param_type} JOIN DB.params ON persons_${param_type}.param_id = params.id WHERE person_id=${person_id}`);
}

export function fetchPersonSkills(person_id) {
  return alasql(`SELECT ps.skill_id as skill_id, l.name as level_name, s.name as skill_name FROM DB.persons_skills ps JOIN DB.persons p ON ps.person_id = p.id JOIN DB.skills s ON s.id=ps.skill_id JOIN DB.levels l ON l.id=ps.level_id WHERE person_id=${person_id}`);
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


export function attachSkillPerson(skill_id, person_id) {
  return alasql("INSERT INTO DB.persons_skills VALUE {person_id:?, skill_id:?, level_id:1}", [person_id, skill_id]);
}

export function attachParamPerson(param_type, param_id, person_id) {
  return alasql(`INSERT INTO DB.persons_${param_type} VALUE {param_id:?, person_id:?}`, [param_id, person_id]);
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



