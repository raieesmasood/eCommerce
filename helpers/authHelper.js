const bcrypt = require("bcrypt");

export const hashPass = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    console.log("Error Whole hashing", error);
  }
};

export const comparePass = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
