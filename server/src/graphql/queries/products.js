const productByHandleQuery = (productHandle) => {
  return `
    {
      productByHandle(handle: "${productHandle}") {
        id
        title
        description
        featuredImage {
          originalSrc
          transformedSrc
        }
        images (first:10) {
          edges {
            node {
              originalSrc
              transformedSrc
            }
          }
        }
        variants (first: 3) {
          edges {
            node {
              id
              storefrontId
              price
              displayName
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
