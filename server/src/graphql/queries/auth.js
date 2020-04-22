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

// const getCustomerByCustomerAccessToken = (token) => {
//   return `
//     query {
//       customer (customerAccessToken: "${token}") {
//         id
//         firstName
//         lastName
//         email
//         defaultAddress {
//           address1
//           address2
//           firstName
//           lastName
//           company
//           city
//           province
//           zip
//           phone
//         }
//       }
//     }
//   `;
// };

const getCustomerByCustomerAccessToken = (token) => {
  return `
    query {
      customer (customerAccessToken: "${token}") {
        id
      }
    }
  `;
};

const renewCustomerAccessToken = (token) => {
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

const triggerPasswordReset = (email) => {
  return `
    mutation {
      customerRecover(email: "${email}") {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
};

const passwordResetByUrl = (resetUrl, password) => {
  return `
    mutation {
      customerResetByUrl(resetUrl: "${resetUrl}", password: "${password}") {
        customer {
          id
        }
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

module.exports = {
  createCustomerAccessToken,
  getCustomerByCustomerAccessToken,
  renewCustomerAccessToken,
  triggerPasswordReset,
  passwordResetByUrl,
};
