const getNumericProductId = origId => {
  return origId.replace(/[^0-9.]/g, '');
};

module.exports = { getNumericProductId };
