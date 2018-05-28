import fixture from 'components/common/fixture.jsx';

export function initDb() {
  // alasql('DROP DATABASE DB');
  // alasql('CREATE localStorage DATABASE IF NOT EXISTS DB');
  alasql('CREATE  DATABASE  DB');
  // alasql('ATTACH localStorage DATABASE DB AS myDB');

  let baseTables = ['roles', 'persons', 'skills', 'teams', 'levels', 'grades', 'weaknesses', 'strengths']

  baseTables.forEach((table_name) => {
    alasql(`CREATE TABLE IF NOT EXISTS DB.${table_name} (id INT PRIMARY KEY AUTO_INCREMENT, name STRING)`);
    alasql.databases.DB.tables[table_name].data = fixture[table_name];
  })

  alasql("CREATE TABLE IF NOT EXISTS DB.persons_teams (id INT PRIMARY KEY AUTO_INCREMENT, person_id INT, team_id INT)");
  alasql.databases.DB.tables.persons_teams.data = fixture.persons_teams;
}
