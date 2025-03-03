import { type ChangeEvent } from "react";
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
      <input
        id="searchInput"
        placeholder="Insert title"
        type="text"
        value={searchText}
        onChange={onChangeSearchText}
      />
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
        <div className={classes.resetFiltersBtn} onClick={onResetFilters}>
          Reset filters
        </div>
      )}
    </div>
  );
};

export default OrdersFilters;
