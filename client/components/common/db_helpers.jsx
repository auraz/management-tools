// no IE support
export function get_person_name_by_id(state, id) {
  return state.persons.find(el => el.id == id).name;
}

export function get_skill_name_by_id(state, id) {
  return state.skills.find(el => el.id == id).name;
}

export function get_level_name_by_id(state, id) {
  return state.levels.find(el => el.id == id).name;
}
