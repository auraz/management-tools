export const ADD_ROLE = "ADD_ROLE";
export const ADD_SKILL = "ADD_SKILL";
export const ADD_PERSON = "ADD_PERSON";
export const ADD_TEAM = "ADD_TEAM";
export const UPDATE_SKILL_LEVEL = "UPDATE_SKILL_LEVEL";

export function addX(params, type){
    return {
        payload: params,
        type: type,
    }
}

