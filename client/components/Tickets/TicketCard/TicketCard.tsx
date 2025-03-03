import Image from "next/image";
import Link from "next/link";

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
  return (
    <Link className={classes.ticketCard} href={`/tickets/${ticket.id}`}>
      <Image
        alt="Ticket cover photo"
        className={classes.coverPhoto}
        height={200}
        src={coverImage}
        width={200}
      />
      <h4 className={classes.ticketTitle}>{ticket.title}</h4>
      <div className={classes.ticketPrice}>
        <p>Price:</p>
        <p>{ticket.price}$</p>
      </div>
      <div className={classes.ticketSeller}>
        <p> Sells:</p>
        <p>
          {user
            ? ` ${user?.firstName} ${user?.lastName} (${getUserRating(
                ticket.userId,
                ratings
              )})`
            : ""}
        </p>
      </div>
      <p className={classes.ticketCategory}>{ticket.category}</p>
    </Link>
  );
};

export default TicketCard;
