export const formatAddress = (address) => {
  const { street, city, state, zip } = address;
  const addressFields = [street, city, state, zip];
  const validFields = addressFields.filter(Boolean);
  return validFields.join(", ");
};
