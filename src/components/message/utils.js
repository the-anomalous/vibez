import { formatRelative } from 'date-fns';

export const formatDate = date => {
  let formattedDate = '';
  if (date) {

    formattedDate = formatRelative(date, new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};