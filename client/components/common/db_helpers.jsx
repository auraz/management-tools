// no IE support
export function get_person_name_by_id(state, id) {
  return state.persons.find(el => el.id == id).name;
}
