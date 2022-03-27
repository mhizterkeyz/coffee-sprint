module.exports = () => ({
  app: { name: process.env.APP_NAME, slug: process.env.APP_SLUG },
  databaseUrl: process.env.DATABASE_URL,
  port: +process.env.PORT || 4567,
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  anonymousSms: {
    apiUrl: process.env.ANONYMOUS_SMS_API_URL,
  },
});
