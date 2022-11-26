import jwt from 'jsonwebtoken';
export const createToken = (data: any) => {
  return jwt.sign(
    {
      data,
    },
    'secret',
    { expiresIn: '1h' }
  );
};
