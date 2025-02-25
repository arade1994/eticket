import { Ticket } from "../types/ticket";
import { Rating, User } from "../types/user";

export const getNumOfCreatedTickets = (user: User, tickets: Ticket[]) =>
  tickets?.filter((ticket) => ticket.userId === user.id)?.length;

export const getUserRaters = (userId: string, ratings: Rating[]) => {
  return ratings.filter((rating) => rating.ratedUserId === userId);
};

export const getUserRating = (userId: string, ratings: Rating[]) => {
  const userRates = ratings
    .filter((rating) => rating.ratedUserId === userId)
    ?.map((rating) => rating.rate);
  const ratesSum = userRates.reduce((a, b) => a + b, 0);
  if (!ratesSum || isNaN(ratesSum)) return "-";
  return (ratesSum / userRates.length).toFixed(1);
};

export const getIsUserRated = (
  userId: string,
  ratings: Rating[],
  currentUserId: string
) =>
  ratings.filter(
    (rating) => rating.ratedUserId === userId && rating.userId === currentUserId
  )?.length;

export const isRatingDisabled = (
  userId: string,
  currentUserId: string,
  ratings: Rating[]
) =>
  userId === currentUserId ||
  getIsUserRated(userId, ratings, currentUserId) !== 0;

export const getUserByUserId = (userId: string, users: User[]) =>
  users.find((user) => user.id === userId);

export const filterUsers = (users: User[], searchText: string) => {
  let filteredUsers = [...users];

  if (searchText.trim() !== "")
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchText) ||
        user.lastName.toLowerCase().includes(searchText)
    );

  return filteredUsers;
};
