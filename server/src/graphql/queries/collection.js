const menuCollectionByHandleQuery = (collectionHandle) => {
  return `
    {
      collectionByHandle(handle: "${collectionHandle}") {
        handle
        description
      }
    }
  `;
};

const collectionByHandleQuery = (collectionHandle) => {
  return `
    {
      collectionByHandle(handle: "${collectionHandle}") {
        description
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              featuredImage {
                originalSrc
                transformedSrc
              }
              priceRange {
                minVariantPrice {
                  amount
                }
              }
            }
          }
        }
      }
    }
  `;
};

module.exports = { menuCollectionByHandleQuery, collectionByHandleQuery };
