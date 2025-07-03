import { type ChangeEvent } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import Select, { type SingleValue } from "react-select";

import { statusOptions } from "../../../utils/constants";

import classes from "./OrdersFilters.module.scss";

interface Props {
  searchText: string;
  selectedUser: { value: string; label: string };
  selectedStatus: { value: string; label: string };
  userOptions: { value: string; label: string }[];
  onChangeSearchText: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectUser: (
    option: SingleValue<{
      value: string;
      label: string;
    }>
  ) => void;
  onSelectStatus: (
    option: SingleValue<{
      value: string;
      label: string;
    }>
  ) => void;
  onResetFilters: () => void;
}

const OrdersFilters: React.FC<React.PropsWithChildren<Props>> = ({
  searchText,
  selectedUser,
  selectedStatus,
  userOptions,
  onChangeSearchText,
  onSelectUser,
  onSelectStatus,
  onResetFilters,
}) => {
  const areFiltersApplied =
    searchText.trim() !== "" ||
    selectedUser.value !== "-" ||
    selectedStatus.value !== "-";

  return (
    <div className={classes.ordersFilters}>
      <div className={classes.searchInput}>
        <FaSearch className={classes.searchIcon} />
        <input
          id="searchInput"
          placeholder="Search orders..."
          type="text"
          value={searchText}
          onChange={onChangeSearchText}
        />
      </div>
      <Select
        id="userSelect"
        options={[{ value: "-", label: "Any user" }, ...userOptions]}
        value={selectedUser}
        onChange={onSelectUser}
      />
      <Select
        id="statusSelect"
        options={statusOptions}
        value={selectedStatus}
        onChange={onSelectStatus}
      />
      {areFiltersApplied && (
        <button className={classes.resetFiltersBtn} onClick={onResetFilters}>
          <FaTimes className={classes.resetIcon} />
          Reset filters
        </button>
      )}
    </div>
  );
};

export default OrdersFilters;
