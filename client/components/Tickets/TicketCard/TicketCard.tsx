import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

import coverImage from "../../../assets/images/cover.png";
import { type Ticket } from "../../../types/ticket";
import { type Rating, type User } from "../../../types/user";
import { getUserRating } from "../../../utils/users";

import classes from "./TicketCard.module.scss";

interface Props {
  ticket: Ticket;
  user?: User;
  ratings: Rating[];
}

const TicketCard: React.FC<React.PropsWithChildren<Props>> = ({
  ticket,
  user,
  ratings,
}) => {
  const rating = useMemo(
    () => getUserRating(ticket.userId, ratings),
    [ratings, ticket.userId]
  );

  return (
    <Link className={classes.ticketCard} href={`/tickets/${ticket.id}`}>
      <Image
        alt="Ticket cover photo"
        className={classes.coverPhoto}
        height={200}
        src={coverImage}
        width={300}
      />
      <div className={classes.ticketContent}>
        <h4 className={classes.ticketTitle}>{ticket.title}</h4>
        <div className={classes.ticketPrice}>
          <p>${ticket.price}</p>
        </div>
        <div className={classes.ticketSeller}>
          <p>
            Seller: {user ? `${user.firstName} ${user.lastName}` : "Unknown"}
          </p>
          {rating !== "-" && (
            <span className={classes.rating}>
              <FaStar /> {rating}
            </span>
          )}
        </div>
        <span className={classes.ticketCategory}>{ticket.category}</span>
      </div>
    </Link>
  );
};

export default TicketCard;
