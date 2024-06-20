import { IUser } from "../constants/interfaces";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER,
  UPDATE_USER,
  SEARCH_USERS,
  FILTER_USERS,
} from "./types";

interface IState {
  loading: boolean;
  users: IUser[];
  filteredUsers: IUser[];
  selectedValue: string;
  error: string;
  searchTerm: string;
  filterOption: string;
}

const initialState: IState = {
  loading: false,
  users: [],
  filteredUsers: [],
  selectedValue: "",
  error: "",
  searchTerm: "",
  filterOption: "",
};

const reducer = (state = initialState, action: any): IState => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        filteredUsers: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        filteredUsers: state.filteredUsers.filter(
          (user) => user.id !== action.payload
        ),
      };
    case UPDATE_USER:
      return {
        ...state,
        filteredUsers: state.filteredUsers.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case SEARCH_USERS:
      const searchTerm = action.payload;
      const filteredUsers = state.users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return {
        ...state,
        searchTerm: searchTerm,
        filteredUsers: filteredUsers,
      };
    case FILTER_USERS:
      const { selectedValue, variant } = action.payload;
      return {
        ...state,
        filteredUsers: selectedValue
          ? state.users.filter(
              (user) => user[variant as keyof IUser] === selectedValue
            )
          : state.users,
        selectedValue: selectedValue,
      };
    default:
      return state;
  }
};

export default reducer;
