import { GET_All_USER } from "../actions";
import { IAllUsers } from "../interfaces/IAllUsers";

const initialState: IAllUsers = {
    results: [],
};

const fetchAllUsersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_All_USER:
            return {
                ...state,
                results: action.payload,
            };

        default:
            return state;
    }
};

export default fetchAllUsersReducer;
