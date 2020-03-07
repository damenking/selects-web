export const getIsoNow = () => {
  return new Date().toISOString();
};

export const getIso24HoursFromNow = () => {
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() + 1);
  return dateObj.toISOString();
};
