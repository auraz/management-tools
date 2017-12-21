export const SAVE_ROLE = "SAVE_ROLE";

export function saveRole(role){
    return {
        type: SAVE_ROLE,
        payload: role,
    }
}
