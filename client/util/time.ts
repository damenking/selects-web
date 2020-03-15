export const getIsoNow = () => {
  return new Date().toISOString();
};

export const getIso24HoursFromNow = () => {
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() + 1);
  return dateObj.toISOString();
};

export const getRentalEndDate = (date: string, varientIndex: number) => {
  // variant indexes: 3 days = 0, 5 days = 1, 7 days = 2
  const variantDayLength = [2, 4, 6];
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + variantDayLength[varientIndex]);
  return dateObj;
};
