import { type ChangeEvent } from "react";

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
      <input
        className={classes.searchInput}
        id="search"
        placeholder="Insert first name or last"
        type="text"
        value={searchText}
        onChange={onChangeSearchText}
      />
      {isFiltersApplied && (
        <div className={classes.resetFiltersBtn} onClick={onResetFilters}>
          Reset filters
        </div>
      )}
    </div>
  );
};

export default UsersFilters;
