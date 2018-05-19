export const ADD_ROLE = "ADD_ROLE";
export const ADD_SKILL = "ADD_SKILL";
export const ADD_PERSON = "ADD_PERSON";
export const ADD_TEAM = "ADD_TEAM";
export const ADD = "ADD";

export function addX(param, type){
    return {
        payload: param,
        type: type,
    }
}

