import { type ChangeEvent } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

import classes from "./UsersFilters.module.scss";

interface Props {
  searchText: string;
  onChangeSearchText: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetFilters: () => void;
}

const UsersFilters: React.FC<React.PropsWithChildren<Props>> = ({
  searchText,
  onChangeSearchText,
  onResetFilters,
}) => {
  const isFiltersApplied = searchText.trim() !== "";

  return (
    <div className={classes.usersFilters}>
      <div className={classes.searchInput}>
        <FaSearch className={classes.searchIcon} />
        <input
          className={classes.searchInputField}
          id="search"
          placeholder="Search users..."
          type="text"
          value={searchText}
          onChange={onChangeSearchText}
        />
      </div>
      {isFiltersApplied && (
        <button className={classes.resetFiltersBtn} onClick={onResetFilters}>
          <FaTimes className={classes.resetIcon} />
          Reset filters
        </button>
      )}
    </div>
  );
};

export default UsersFilters;
