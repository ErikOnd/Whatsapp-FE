import { GET_ALL_USERS } from "../actions";
import { IAllUsers } from "../interfaces/IAllUsers";

const initialState: IAllUsers = {
  results: [],
};

const fetchAllUsersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        results: action.payload,
      };

    default:
      return state;
  }
};

export default fetchAllUsersReducer;
