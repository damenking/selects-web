const convertToE164 = (origNumber) => {
  const convertedNumber = origNumber.replace(/[^0-9.]/g, '');
  return `+1${convertedNumber}`;
};

module.exports = { convertToE164 };
