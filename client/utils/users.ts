import { type Ticket } from "../types/ticket";
import { type Rating, type User } from "../types/user";

/**
 * Returns number of created tickets per user
 * @param userId - specific user
 * @param tickets - list of tickets
 * @returns number of tickets
 */
export const getNumOfCreatedTickets = (userId: string, tickets: Ticket[]) =>
  tickets.filter((ticket) => ticket.userId === userId)?.length;

/**
 * Gets all the ratings for one specific user
 * @param userId - specific user
 * @param ratings - ratings list
 * @returns - all ratings for user
 */
export const getUserRatings = (userId: string, ratings: Rating[]) => {
  return ratings.filter((rating) => rating.ratedUserId === userId);
};

/**
 * Calculates user final rating number
 * @param userId - specific user
 * @param ratings - ratings list
 * @returns - final rating
 */
export const getUserRating = (userId: string, ratings: Rating[]) => {
  const userRates = getUserRatings(userId, ratings)?.map(
    (rating) => rating.rate
  );
  const ratesSum = userRates.reduce((a, b) => a + b, 0);
  if (!ratesSum || isNaN(ratesSum)) return "-";
  return (ratesSum / userRates.length).toFixed(1);
};

/**
 * Returns an information whether user is rated or not by the currently logged in user
 * @param userId - specific user
 * @param ratings - list of ratings
 * @param currentUserId - logged in user
 * @returns - boolean value for rated status of a user
 */
export const getIsUserRated = (
  userId: string,
  ratings: Rating[],
  currentUserId: string
) =>
  !!ratings.filter(
    (rating) => rating.ratedUserId === userId && rating.userId === currentUserId
  )?.length;

/**
 * Filters users list by first and last name
 * @param users - list of users
 * @param searchText - first name or last name text
 * @returns - list of filtered users
 */
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
