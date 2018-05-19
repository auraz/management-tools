import shortid from 'shortid'

// Should be valid JSON, otherwise localStorage did not updated.
let fixture = {
  "roles": [
    { id: shortid.generate(), name:"Developer"           },
    { id: shortid.generate(), name:"DevOPS"              },
    { id: shortid.generate(), name:"QA"                  },
    { id: shortid.generate(), name:"Architect"           },
    { id: shortid.generate(), name:"Lead"                },
    { id: shortid.generate(), name:"Product Owner"       },
    { id: shortid.generate(), name:"Project Coordinator" },
    { id: shortid.generate(), name:"Team Coordinator"    }
  ],
  "grades": [
      "Junior",
      "Middle",
      "Senior",
      "Lead"
  ],
  "persons": [
      "Vladas",
      "Indra",
      "Alex Koval"
  ],
  "persons_skills": {
    "Vladas": [
      ["Communication", "Enough"],
      ["Initiative", "Not Enough"]
    ],
    "Indra":  [
    ],
    "Koval": [
      ["Devops Architecture", "Enough"],
      ["Delivery in time", "Not Enough"]
    ]
  },
  "teams": [
    "Web development",
    "DevOPS"
  ],
  persons_teams: [
  ],
  "skills": [
    "Javascript",
    "Python",
    "Django",
    "React",
    "Redux",
    "Php",
    "Communication",
    "Initiative",
    "Devops Architecture",
    "Delivery in time"
  ],
  levels: [
    "Enough",
    "Not enough{ id: shoritid.generate(), name:"
  ]
}

export default fixture
