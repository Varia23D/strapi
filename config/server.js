module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: ['HDwsR5fCApWQcGf2J8zZ+bQRKYccLhBLsqslMORX2mQ=', 'AHXtsYcZLPeok24FTFcByH1/nMw8GDEaDssZWlHgZJI='],
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
