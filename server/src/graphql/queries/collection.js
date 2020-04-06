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

module.exports = { menuCollectionByHandleQuery };
