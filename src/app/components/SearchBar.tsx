"use client";

import React from "react";
import { searchUsers } from "../redux/actions";
import { RootState, useAsyncDispatch } from "../redux/store";
import { useSelector } from "react-redux";

const SearchBar: React.FC = () => {
  const dispatch = useAsyncDispatch();
  const users = useSelector((state: RootState) => state.users);
  const filteredUsers = useSelector((state: RootState) => state.filteredUsers);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    dispatch(searchUsers(searchTerm));
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search users by name"
        onChange={handleSearch}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default SearchBar;
