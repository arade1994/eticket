import React, { ChangeEvent, useMemo } from "react";
import Select, { SingleValue } from "react-select";

import { ticketCategoriesOptions } from "../../../utils/constants";
import { User } from "../../../types/user";
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
        type="text"
        placeholder="Insert title"
        value={searchText}
        onChange={onChangeSearchText}
      />
      <Select
        value={category}
        onChange={onChangeCategory}
        options={[
          { value: "-", label: "Any category" },
          ...ticketCategoriesOptions,
        ]}
      />
      <Select
        value={selectedUser}
        onChange={onSelectUser}
        options={[{ value: "-", label: "Any user" }, ...userOptions]}
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
