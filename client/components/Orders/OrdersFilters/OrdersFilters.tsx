import Select, { SingleValue } from "react-select";

import classes from "./OrdersFilters.module.scss";
import { ChangeEvent } from "react";
import { statusOptions } from "../../../utils/constants";

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
        type="text"
        placeholder="Insert title"
        value={searchText}
        onChange={onChangeSearchText}
      />
      <Select
        id="userSelect"
        value={selectedUser}
        onChange={onSelectUser}
        options={[{ value: "-", label: "Any user" }, ...userOptions]}
      />
      <Select
        id="statusSelect"
        value={selectedStatus}
        onChange={onSelectStatus}
        options={statusOptions}
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
