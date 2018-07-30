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

const hostname = "http://localhost:3000/";
axios.defaults.baseURL = hostname;

export const Models = {
  all: (modelName) => axios.get(modelName),
  one: (modelName, id) => axios.get(`{modelName}?id=eq${id}`),
  deleteOne: (modelName, id) => axios.delete(`{modelName}?id=eq.${id}`),
  rename: (modelName, id, name) => axios.patch(`{modelName}?id=eq.${id}`, {"name": name}),
  addBase: (modelName, name) => axios.post(`{modelName}`, {"name": name}),

  // axios.get(`/teams_roles?select=role&teams.id=eq.${team_id}`);
  TeamsRoles: () => {
    return axios.get(`teams_roles?select=id,roles(id,name),teams(id,name)`)
  },
  TeamsRolesForTeam: (team_id) => {
    return axios.get(`teams_roles?team=eq.${team_id}`)
  },
  attachTeamRole: (role_id, team_id) => {
    return axios.post(`teams_roles`, {"role": role_id, "team": team_id});
  },
  deleteTeamRole: (role_id, team_id) => {
    return axios.delete(`teams_roles?team=eq.${team_id}&role=eq.${role_id}`)
  },

  DeleteList: (modelName, idList) => {
    let args = '(' + idList.join(',') + ')'
    return axios.delete(`{modelName}?id=in.${args}`)
  },
}

export const Persons = {
  all: () => Models.all('persons'),
  get: (id) => Models.one('persons', id),
  add: (name) => Models.addBase('persons', name),
  delete: (id) => Models.deleteOne('persons', id),
}


export function fixturesToDb() {
  let postFixtures = async (tablename) => {
    let data = jsonFixture[tablename].map( e => ({'name': e }) )

    const r1 = await axios.delete(`{tablename}`);
    console.log(r1, r1.data);

    const response = await axios.post(`{tablename}`, data);
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
