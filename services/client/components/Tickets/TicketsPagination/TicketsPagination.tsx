import { useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import classes from "./TicketsPagination.module.scss";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TicketsPagination: React.FC<React.PropsWithChildren<Props>> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const renderPageNumbers = useCallback(() => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${classes.pageButton} ${
            currentPage === i ? classes.active : ""
          }`}
          id={`page-${i}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  }, [currentPage, onPageChange, totalPages]);

  return (
    totalPages > 1 && (
      <div className={classes.pagination}>
        <button
          className={`${classes.pageButton} ${classes.navButton}`}
          disabled={currentPage === 1}
          id="paginate-left"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <FaChevronLeft />
        </button>
        {renderPageNumbers()}
        <button
          className={`${classes.pageButton} ${classes.navButton}`}
          disabled={currentPage === totalPages}
          id="paginate-right"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <FaChevronRight />
        </button>
      </div>
    )
  );
};

export default TicketsPagination;
