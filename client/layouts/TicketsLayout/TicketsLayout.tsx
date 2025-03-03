import React, { type ChangeEvent, useCallback, useMemo, useState } from "react";
import { type SingleValue } from "react-select";

import CreateTicketModal from "../../components/Tickets/CreateTicketModal/CreateTicketModal";
import TicketFilters from "../../components/Tickets/TicketsFilters/TicketFilters";
import TicketsGrid from "../../components/Tickets/TicketsGrid/TicketsGrid";
import { type Ticket } from "../../types/ticket";
import { type Rating, type User } from "../../types/user";
import { filterTickets } from "../../utils/tickets";

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

  const handleChangeSearchText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
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
    },
    []
  );

  const handleResetFilters = useCallback(() => {
    setSearchText("");
    setCategory({ value: "-", label: "Any Category" });
    setSelectedUser({ value: "-", label: "Any user" });
  }, []);

  const handleOpenCreateTicketModal = useCallback(() => {
    setShowCreateTicketModal(true);
  }, []);

  const handleCloseCreateTicketModal = useCallback(() => {
    setShowCreateTicketModal(false);
  }, []);

  const filteredTickets = useMemo(
    () =>
      filterTickets(tickets, searchText, category.value, selectedUser.value),
    [tickets, searchText, category, selectedUser]
  );

  return (
    <div className={classes.ticketsContent}>
      <div className={classes.ticketsControls}>
        <TicketFilters
          category={category}
          searchText={searchText}
          selectedUser={selectedUser}
          users={users}
          onChangeCategory={handleChangeCategory}
          onChangeSearchText={handleChangeSearchText}
          onResetFilters={handleResetFilters}
          onSelectUser={handleSelectUser}
        />
        <button
          className={classes.sellTicketBtn}
          onClick={handleOpenCreateTicketModal}
        >
          Sell Ticket
        </button>
      </div>
      {filteredTickets.length ? (
        <TicketsGrid
          ratings={ratings}
          tickets={filteredTickets}
          users={users}
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
