import * as bcrypt from 'bcryptjs';

export const isPasswordValid = (
  password: string,
  userPassword: string,
): boolean => {
  return bcrypt.compareSync(password, userPassword);
};

export const encodePassword = (password: string): string => {
  const salt: string = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, salt);
};
