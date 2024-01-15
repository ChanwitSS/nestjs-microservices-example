export const jwtConstants = {
  secret: 'SECRET32',
};

export const jwtConfig = {
  global: true,
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '1d' },
};
