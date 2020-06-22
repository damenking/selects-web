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

// not currently used
const allProductsQuery = `
  { 
    products(first: 50) {
      edges {
        node {
          id
          title
          handle
          tags
          featuredImage {
            originalSrc
            transformedSrc
          }
          collections (first: 10) {
            edges {
              node {
                id
                title
              }
            }
          }
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

const productsSearchQuery = `
  { 
    products(first: 250) {
      edges {
        node {
          id
          title
          handle
          tags
          featuredImage {
            originalSrc
            transformedSrc
          }
        }
      }
    }
  }
`;

const productsByTagsQuery = (tags) => {
  return `
    query { 
      products(first: 50, query:"tag:${tags}") {
        edges {
          node {
            id
            title
            handle
            tags
            priceRange {
              minVariantPrice {
                amount
              }
            }
            media(first: 1) {
              edges {
                node {
                  previewImage {
                    originalSrc
                    transformedSrc
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
};

module.exports = {
  allProductsQuery,
  productByHandleQuery,
  productsSearchQuery,
  productsByTagsQuery,
};
