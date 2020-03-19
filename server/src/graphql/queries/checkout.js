const deleteCheckout = checkoutId => {
  return `
    mutation {
      checkoutCompleteWithTokenizedPaymentV2(
        checkoutId: "${checkoutId}",
        payment: {
          paymentAmount: {
            amount: 3.05,
            currencyCode: USD
          },
          idempotencyKey: "0123",
          billingAddress: {
            address1: "123 N 1st Street",
            city: "Springfield",
            firstName: "NotAReal",
            lastName: "Customer",
            zip: "90210",
            country: "United States",
            province: "CA"
          },
          paymentData: "placeholder",
          type: "placeholder"
        }
      ) {
        checkout {
          id
        }
        checkoutUserErrors {
          code
          field
          message
        }
        payment {
          id
        }
      }
    }
  `;
};

const updateShippingLine = (checkoutId, shippingRateHandle) => {
  return `
    mutation {
      checkoutShippingLineUpdate(checkoutId: "${checkoutId}", shippingRateHandle: "${shippingRateHandle}") {
        checkout {
          id
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;
};

module.exports = { deleteCheckout, updateShippingLine };
