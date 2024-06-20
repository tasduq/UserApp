import { IUser } from "../constants/interfaces";
import { AppThunk } from "./store";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER,
  UPDATE_USER,
  SEARCH_USERS,
  FILTER_USERS,
} from "./types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fetchUsers = (): AppThunk => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USERS_REQUEST });

    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: data,
    });

    dispatch(filterUsers("", "username"));
  } catch (error) {
    if (error instanceof Error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: error.message,
      });
      toast.error(`Error fetching users: ${error.message}`);
    } else {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: "An unknown error occurred.",
      });
      toast.error("An unknown error occurred while fetching users.");
    }
  }
};

export const deleteUser =
  (userId: number): AppThunk =>
  async (dispatch) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "DELETE",
      });

      dispatch({
        type: DELETE_USER,
        payload: userId,
      });
      toast.success("User deleted successfully.");
    } catch (error) {
      console.log("Error deleting user:", error);
      toast.error("An error occurred while deleting the user.");
    }
  };

export const updateUser =
  (updatedUser: IUser): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      const data = await response.json();

      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
      toast.success("User updated successfully.");
    } catch (error) {
      console.log("Error updating user:", error);
      toast.error("An error occurred while updating the user.");
    }
  };

export const searchUsers = (searchTerm: string) => ({
  type: SEARCH_USERS,
  payload: searchTerm,
});

export const filterUsers = (
  selectedValue: string,
  variant: "username" | "email"
) => ({
  type: FILTER_USERS,
  payload: { selectedValue, variant },
});
