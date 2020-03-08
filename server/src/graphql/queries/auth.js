const createCustomerAccessToken = (email, password) => {
  return `
    mutation {
      customerAccessTokenCreate(input: {
        email: "${email}",
        password: "${password}",
      }) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
};

const checkCustomerAccessToken = token => {
  return `
    query {
      customer (customerAccessToken: "${token}") {
        firstName,
      }
    }
  `;
};

module.exports = { createCustomerAccessToken, checkCustomerAccessToken };
