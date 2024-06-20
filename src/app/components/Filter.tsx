"use client";

import React, { useState } from "react";
import { filterUsers } from "../redux/actions";
import { useAsyncDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

interface FilterProps {
  variant: "username" | "email";
}

const Filter: React.FC<FilterProps> = ({ variant }) => {
  const dispatch = useAsyncDispatch();
  const users = useSelector((state: RootState) => state.users);
  const [selectedValue, setSelectedValue] = useState<string>("All");

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedValue(selectedValue);
    dispatch(filterUsers(selectedValue, variant));
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={selectedValue || ""}
        onChange={handleFilter}
        className="my-6 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">All</option>
        {users.map((user) => (
          <option
            key={user.id}
            value={variant === "username" ? user.username : user.email}
          >
            {variant === "username" ? user.username : user.email}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
