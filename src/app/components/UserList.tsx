"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../redux/actions";
import { RootState, useAsyncDispatch } from "../redux/store";
import UserItem from "./UserItem";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { IUser } from "../constants/interfaces";

const UserList: React.FC = () => {
  const filteredUsers = useSelector((state: RootState) => state.filteredUsers);
  const dispatch = useAsyncDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  const handleUpdate = (updatedUser: IUser) => {
    dispatch(updateUser(updatedUser));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      <div className="mb-4">
        <SearchBar />
      </div>
      <div className="mb-4 flex flex-col sm:flex-row justify-between">
        <div className="mb-2 sm:mb-0 sm:mr-2">
          <Filter variant="username" />
        </div>
        <div>
          <Filter variant="email" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredUsers.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
