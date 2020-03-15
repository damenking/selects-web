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

const getCustomerByCustomerAccessToken = token => {
  return `
    query {
      customer (customerAccessToken: "${token}") {
        displayName,
        email
        defaultAddress {
          address1
          address2
          firstName
          lastName
          company
          city
          province
          zip
          phone
        }
      }
    }
  `;
};

const renewCustomerAccessToken = token => {
  return `
    mutation {
      customerAccessTokenRenew(customerAccessToken: "${token}") {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
};

module.exports = {
  createCustomerAccessToken,
  getCustomerByCustomerAccessToken,
  renewCustomerAccessToken
};
