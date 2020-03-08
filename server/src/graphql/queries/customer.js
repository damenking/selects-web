const createCustomer = (email, password, firstName, lastName) => {
  return `
    mutation {
      customerCreate(input: {
        email: "${email}",
        password: "${password}",
        firstName: "${firstName}",
        lastName: "${lastName}"
      }) {
        userErrors {
          field
          message
        }
        customer {
          id
        }
      }
    }
  `;
};

module.exports = { createCustomer };
