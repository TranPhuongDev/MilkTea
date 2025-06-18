export const generateRandomNumber = (): string => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return randomNumber.toString();
};
