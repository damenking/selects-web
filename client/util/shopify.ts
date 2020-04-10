// export const getHandleFromName = (name: string) => {
//   return name.replace(/\s+/g, '-').toLowerCase();
// };
export const getHandleFromName = (name: string) => {
  return name.replace(/[^A-Z0-9]/gi, '-').toLowerCase();
};

export const fixVariantPrice = (price: string) => {
  return `${parseInt(price, 10) / 100}`;
};
