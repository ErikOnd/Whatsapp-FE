import { GET_MY_PROFILE } from "../actions";
import { IAllUsers } from "../interfaces/IAllUsers";

const initialState: IAllUsers = {
  results: [],
};

const getMyProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_MY_PROFILE:
      return {
        ...state,
        results: action.payload,
      };

    default:
      return state;
  }
};

export default getMyProfileReducer;
