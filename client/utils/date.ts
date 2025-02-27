/**
 * Calculates expiration date (which is 15 minutes long) starting from the current moment
 * @returns Expiration date
 */
export const calculateExpirationDate = () => {
  const expiration = new Date();
  return expiration.setSeconds(expiration.getSeconds() + 15 * 60);
};

/**
 * Formats date string to a hh:mm format
 * @param date - string date
 * @returns date in hh:mm format
 */
export const formatDateToHHMM = (date: string) => {
  const dateObject = new Date(date);

  return `${dateObject.getHours()}:${dateObject.getMinutes()}`;
};
