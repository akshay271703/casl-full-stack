import * as bcrypt from 'bcrypt';

export const encrypt = async (plain: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
};

export const checkHash = async (plain: string, hashed: string) => {
  return bcrypt.compare(plain, hashed);
};
