const getNumericProductId = (origId) => {
  return origId.replace(/[^0-9.]/g, '');
};

const getIdFromBase64 = (base64Id) => {
  return Buffer.from(base64Id, 'base64').toString();
};

module.exports = { getNumericProductId, getIdFromBase64 };
