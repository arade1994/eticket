export const calculateExpirationDate = () => {
  const expiration = new Date();
  return expiration.setSeconds(expiration.getSeconds() + 15 * 60);
};

export const getExpiresTimeFormat = (date: string) => {
  const dateObject = new Date(date);

  return `${dateObject.getHours()}:${dateObject.getMinutes()}`;
};
