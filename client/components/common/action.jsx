export const ADD_ROLE = "ADD_ROLE";
export const ADD_SKILL = "ADD_SKILL";
export const ADD_PERSON = "ADD_PERSON";
export const ADD_TEAM = "ADD_TEAM";
export const UPDATE_SKILL_LEVEL = "UPDATE_SKILL_LEVEL";
export const UPDATE_PERSON_NAME = "UPDATE_PERSON_NAME";
export const UPDATE_ROLE_NAME = "UPDATE_ROLE_NAME";
export const UPDATE_SKILL_NAME = "UPDATE_SKILL_NAME";
export const UPDATE_TEAM_NAME = "UPDATE_TEAM_NAME";
export const UPDATE_PARAM_NAME = "UPDATE_PARAMETER_NAME";
export const ADD_PARAMETER = "ADD_PARAMETER"
export const ADD_PARAMETER_TO_PERSON = "ADD_PARAMETER_TO_PERSON"
export const ADD_SKILL_TO_PERSON = "ADD_SKILL_TO_PERSON"


export function addX(params, type){
    return {
        payload: params,
        type: type,
    }
}

