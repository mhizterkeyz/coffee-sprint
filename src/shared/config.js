module.exports = () => ({
  app: { name: process.env.APP_NAME, slug: process.env.APP_SLUG },
  databaseUrl: process.env.DATABASE_URL,
  port: +process.env.PORT || 4567,
});
