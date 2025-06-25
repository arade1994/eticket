import { type Dayjs } from "dayjs";

import dayjs from "../../app/src/lib/dayjs";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Calculates expiration date (which is 15 minutes long) starting from the current moment
 * @returns Expiration date
 */
export const calculateExpirationDate = () => {
  const now = dayjs();
  now.add(15, "minute");
  return formatDateToHHMM(now);
};

/**
 * Formats date to a hh:mm format
 * @param date - date
 * @returns date in hh:mm format
 */
export const formatDateToHHMM = (date: string | Date | Dayjs) => {
  return dayjs.utc(date).tz(timezone).format("HH:mm");
};

/**
 * Formats date time to UTC format
 * @param dateTime - date time
 * @returns date time in UTC format
 */
export const formatDateTimeToUTC = (dateTime: string | Date | Dayjs) => {
  return dayjs.tz(dateTime, timezone).utc().toISOString();
};
