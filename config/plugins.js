module.exports = ({ env }) => ({
	// ...
	'users-permissions': {
	  enabled: true,
    /* 'keycloak': {
      enabled: true,
      serverUrl: 'http://localhost:8080/auth',
      realm: 'strapi-realm',
      clientId: 'strapi-client',
      secret: 'your-secret',
    }, */
    // ...
    config: {
      providers: {
        keycloak: {
          issuer: 'http://localhost:8080/realms/strapi-realm',
          clientId: 'strapi-client',
          clientSecret: env('KEYCLOAK_CLIENT_SECRET'),
          scope: ['openid', 'profile', 'email'],
          authorizationParams: {
            response_type: 'code',
            scope: 'openid profile email',
          },
          callbackURL: 'http://localhost:1337/api/connect/keycloak/callback',
        },
      },
    },
  },
});