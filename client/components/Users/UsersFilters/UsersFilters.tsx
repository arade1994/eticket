import { ChangeEvent } from "react";
import classes from "./UsersFilters.module.scss";

interface Props {
  isFiltersApplied: boolean;
  searchText: string;
  onChangeSearchText: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetFilters: () => void;
}

const UsersFilters: React.FC<React.PropsWithChildren<Props>> = ({
  isFiltersApplied,
  searchText,
  onChangeSearchText,
  onResetFilters,
}) => {
  return (
    <div className={classes.usersFilters}>
      <input
        className={classes.searchInput}
        type="text"
        placeholder="Insert first name or last"
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
