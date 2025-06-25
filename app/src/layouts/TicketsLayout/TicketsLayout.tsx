import React, { type ChangeEvent, useCallback, useMemo, useState } from "react";
import { type SingleValue } from "react-select";

import CreateTicketModal from "../../components/Tickets/CreateTicketModal/CreateTicketModal";
import TicketFilters from "../../components/Tickets/TicketsFilters/TicketFilters";
import TicketsGrid from "../../components/Tickets/TicketsGrid/TicketsGrid";
import { type Ticket } from "../../types/ticket";
import { type Rating, type User } from "../../types/user";
import { filterTickets } from "../../../../client_deprecated/utils/tickets";

import classes from "./TicketsLayout.module.scss";

interface Props {
  ratings: Rating[];
  tickets: Ticket[];
  users: User[];
}

const TicketsLayout = ({ ratings, tickets, users }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<{ value: string; label: string }>({
    value: "-",
    label: "Any category",
  });
  const [selectedUser, setSelectedUser] = useState({
    value: "-",
    label: "Any user",
  });
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState({
    value: 8,
    label: "8 per page",
  });

  const handleChangeSearchText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
      setCurrentPage(1); // Reset to first page when search changes
    },
    []
  );

  const handleChangeCategory = useCallback(
    (
      option: SingleValue<{
        value: string;
        label: string;
      }>
    ) => {
      setCategory({
        value: option?.value ?? "-",
        label: option?.label ?? "Any category",
      });
      setCurrentPage(1);
    },
    []
  );

  const handleSelectUser = useCallback(
    (
      option: SingleValue<{
        value: string;
        label: string;
      }>
    ) => {
      setSelectedUser({
        value: option?.value ?? "-",
        label: option?.label ?? "Any user",
      });
      setCurrentPage(1);
    },
    []
  );

  const handleResetFilters = useCallback(() => {
    setSearchText("");
    setCategory({ value: "-", label: "Any Category" });
    setSelectedUser({ value: "-", label: "Any user" });
    setCurrentPage(1);
  }, []);

  const handleOpenCreateTicketModal = useCallback(() => {
    setShowCreateTicketModal(true);
  }, []);

  const handleCloseCreateTicketModal = useCallback(() => {
    setShowCreateTicketModal(false);
  }, []);

  const handleItemsPerPageChange = useCallback(
    (option: SingleValue<{ value: number; label: string }>) => {
      if (option) {
        setItemsPerPage(option);
        setCurrentPage(1);
      }
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const filteredTickets = useMemo(
    () =>
      filterTickets(tickets, searchText, category.value, selectedUser.value),
    [tickets, searchText, category, selectedUser]
  );

  return (
    <div className={classes.ticketsContent}>
      <div className={classes.ticketsControls}>
        <div className={classes.controlsLeft}>
          <TicketFilters
            category={category}
            itemsPerPage={itemsPerPage}
            searchText={searchText}
            selectedUser={selectedUser}
            users={users}
            onChangeCategory={handleChangeCategory}
            onChangeSearchText={handleChangeSearchText}
            onItemsPerPageChange={handleItemsPerPageChange}
            onResetFilters={handleResetFilters}
            onSelectUser={handleSelectUser}
          />
        </div>
        <button
          className={classes.sellTicketBtn}
          onClick={handleOpenCreateTicketModal}
        >
          Sell Ticket
        </button>
      </div>
      {filteredTickets.length ? (
        <TicketsGrid
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          ratings={ratings}
          tickets={filteredTickets}
          users={users}
          onPageChange={handlePageChange}
        />
      ) : (
        <h1 className={classes.emptyListHeading}>
          No available tickets! Go to Sell Tickets link to create some.
        </h1>
      )}
      {showCreateTicketModal && (
        <CreateTicketModal
          isOpen={showCreateTicketModal}
          onClose={handleCloseCreateTicketModal}
        />
      )}
    </div>
  );
};

export default TicketsLayout;
