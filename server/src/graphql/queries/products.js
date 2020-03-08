const productByHandleQuery = productHandle => {
  return `
    {
      productByHandle(handle: "${productHandle}") {
        id
        title
        description
        priceRange {
          maxVariantPrice {
            amount
          }
        }
        variants (first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;
};

const allProductsQuery = `
  { 
    products(first: 50) {
      edges {
        node {
          id
          title
          handle
          images(first: 10) {
            edges {
              node {
                originalSrc
                transformedSrc
              }
            }
          }
        }
      }
    }
  }
`;

module.exports = { allProductsQuery, productByHandleQuery };
