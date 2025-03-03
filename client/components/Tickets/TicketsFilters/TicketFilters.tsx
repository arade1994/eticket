import React, { type ChangeEvent, useMemo } from "react";
import Select, { type SingleValue } from "react-select";

import { type User } from "../../../types/user";
import { ticketCategoriesOptions } from "../../../utils/constants";

import classes from "./TicketFilters.module.scss";

interface Props {
  category: {
    value: string;
    label: string;
  };
  searchText: string;
  selectedUser: {
    value: string;
    label: string;
  };
  users: User[];
  onChangeCategory: (
    option: SingleValue<{
      value: string;
      label: string;
    }>
  ) => void;
  onChangeSearchText: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetFilters: () => void;
  onSelectUser: (
    option: SingleValue<{
      value: string;
      label: string;
    }>
  ) => void;
}

const TicketFilters = ({
  category,
  searchText,
  selectedUser,
  users,
  onChangeCategory,
  onChangeSearchText,
  onResetFilters,
  onSelectUser,
}: Props) => {
  const userOptions = useMemo(
    () =>
      users.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
      })),
    [users]
  );

  const isFiltersApplied = useMemo(
    () =>
      searchText.trim() !== "" ||
      category.value !== "-" ||
      selectedUser.value !== "-",
    [searchText, category.value, selectedUser.value]
  );

  return (
    <div className={classes.ticketFilters}>
      <input
        id="title"
        placeholder="Insert title"
        type="text"
        value={searchText}
        onChange={onChangeSearchText}
      />
      <Select
        id="categorySelect"
        options={[
          { value: "-", label: "Any category" },
          ...ticketCategoriesOptions,
        ]}
        value={category}
        onChange={onChangeCategory}
      />
      <Select
        id="userSelect"
        options={[{ value: "-", label: "Any user" }, ...userOptions]}
        value={selectedUser}
        onChange={onSelectUser}
      />
      {isFiltersApplied && (
        <div className={classes.resetFilters} onClick={onResetFilters}>
          Reset filters
        </div>
      )}
    </div>
  );
};

export default TicketFilters;
