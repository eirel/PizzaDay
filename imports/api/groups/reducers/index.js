export const groupsReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_GROUPS':
            return action.groups
        case 'ADD_GROUP':
            return [
                ...state,
                action.group
            ]
        default:
            return state
    }
}