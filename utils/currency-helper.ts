export const handleFormatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const handleDiscount = ({
  price,
  discount,
}: {
  price: number;
  discount: number;
}) => {
  return price - (price * discount) / 100;
};
