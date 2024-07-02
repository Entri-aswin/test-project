import bcrypt from "bcrypt";

export const generateHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword =await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const compareHashedPassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
