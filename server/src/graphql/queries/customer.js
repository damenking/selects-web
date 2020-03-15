const createCustomer = (email, password, firstName, lastName, phone) => {
  return `
    mutation {
      customerCreate(input: {
        email: "${email}",
        password: "${password}",
        firstName: "${firstName}",
        lastName: "${lastName}",
        phone: "${phone}"
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

const createAddress = (
  firstName,
  lastName,
  phone,
  company,
  address1,
  address2,
  city,
  province,
  zip,
  customerAccessToken
) => {
  return `
    mutation {
      customerAddressCreate(
        customerAccessToken: "${customerAccessToken}",
        address: {
          firstName: "${firstName}",
          lastName: "${lastName}",
          company: "${company}",
          phone: "${phone}",
          address1: "${address1}",
          address2: "${address2}",
          city: "${city}",
          province: "${province}",
          zip: "${zip}",
          country: "United States"
        }
      ) {
        customerAddress {
          id
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

module.exports = { createCustomer, createAddress };
