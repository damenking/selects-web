export const getVarianceIndexByDays = (numDays: number) => {
  if (numDays > 0 && numDays <= 3) {
    return 0;
  } else if (numDays > 3 && numDays <= 5) {
    return 1;
  } else if (numDays > 5) {
    return 2;
  }
  return 0;
};
