export const ellipseAddress = (address = '', width = 10): string => {
  if (!address) return '';
  return `${address.slice(0, width)}...${address.slice(-width)}`;
};
export const getShortAddress = (address: string): string => {
  if (address.length == 0) return '';
  return address?.slice(0, 5) + '...' + address?.slice(-4);
};
