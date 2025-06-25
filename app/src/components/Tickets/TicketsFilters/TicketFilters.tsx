import React, { type ChangeEvent, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import Select, { type SingleValue } from "react-select";

import { type User } from "../../../types/user";
import { ticketCategoriesOptions } from "../../../../../client_deprecated/utils/constants";

import classes from "./TicketFilters.module.scss";

const ITEMS_PER_PAGE_OPTIONS = [
  { value: 8, label: "8 per page" },
  { value: 12, label: "12 per page" },
  { value: 16, label: "16 per page" },
  { value: 24, label: "24 per page" },
];

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
  itemsPerPage: { value: number; label: string };
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
  onItemsPerPageChange: (
    option: SingleValue<{
      value: number;
      label: string;
    }>
  ) => void;
}

const TicketFilters = ({
  category,
  searchText,
  selectedUser,
  users,
  itemsPerPage,
  onChangeCategory,
  onChangeSearchText,
  onResetFilters,
  onSelectUser,
  onItemsPerPageChange,
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
      <Select
        className={classes.itemsPerPageSelect}
        id="itemsPerPageSelect"
        options={ITEMS_PER_PAGE_OPTIONS}
        value={itemsPerPage}
        onChange={onItemsPerPageChange}
      />
      {isFiltersApplied && (
        <button className={classes.resetFilters} onClick={onResetFilters}>
          <FaTimes className={classes.resetIcon} />
          Reset filters
        </button>
      )}
    </div>
  );
};

export default TicketFilters;
