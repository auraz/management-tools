import shortid from 'shortid'

// Should be valid JSON, otherwise localStorage did not updated.
let fixture = {
  "roles": [
    { id: 1, name:"Developer"           },
    { id: 2, name:"DevOPS"              },
    { id: 3, name:"QA"                  },
    { id: 4, name:"Architect"           },
    { id: 5, name:"Lead"                },
    { id: 6, name:"Product Owner"       },
    { id: 7, name:"Project Coordinator" },
    { id: 8, name:"Team Coordinator"    }
  ],
  "persons": [
      { id: 1, name: "Vladas" },
      { id: 2, name: "Indra" },
      { id: 3, name: "Alex Koval" }
  ],
  "skills": [
    { id: 1, name: "Javascript" },
    { id: 2, name: "Python" },
    { id: 3, name: "Django" },
    { id: 4, name: "React" },
    { id: 5, name: "Redux" },
    { id: 6, name: "Php" },
    { id: 7, name: "Communication" },
    { id: 8, name: "Initiative" },
    { id: 9, name: "Devops Architecture" },
    { id: 10, name: "Delivery in time" }
  ],
  "teams": [
    { id: 1, name: "Web development"},
    { id: 2, name: "DevOPS"}
  ],
  "levels": [
    { id: 1, name: "Enough" },
    { id: 2, name: "Not enough" }
  ],
  "grades": [
    { id: 1, name:"Junior"           },
    { id: 2, name:"Middle"              },
    { id: 3, name:"Senior"                  },
    { id: 4, name:"Lead"           }
  ],
  "persons_skills": [
  ],
  "persons_teams": [
    { id: 1, person_id: 1, team_id: 1 },
    { id: 2, person_id: 2, team_id: 1 },
    { id: 3, person_id: 3, team_id: 2 }
  ]
}

export default fixture
