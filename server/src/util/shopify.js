const getNumericProductId = (origId) => {
  return origId.replace(/[^0-9.]/g, '');
};

const getIdFromBase64 = (base64Id) => {
  return Buffer.from(base64Id, 'base64').toString();
};

const getBase64FromString = (s) => {
  return Buffer.from(`${s}`).toString('base64');
};

const getGlobalId = (model, id) => {
  return `gid://shopify/${model}/${id}`;
};

const validateCustomerUpdateFields = (fields) => {
  const acceptableFields = [
    'id',
    'email',
    'accepts_marketing',
    'first_name',
    'last_name',
    'phone',
    'addresses',
    'default_address',
  ];
  Object.keys(fields).forEach((key) => {
    if (!acceptableFields.includes(key)) {
      return false;
    }
  });
  return true;
};

module.exports = {
  getNumericProductId,
  getIdFromBase64,
  validateCustomerUpdateFields,
  getBase64FromString,
  getGlobalId,
};
