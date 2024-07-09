module.exports = ({ env }) => ({
	// ...
	'users-permissions': {
	  enabled: true,
    config: {
      providers: {
        keycloak: {
          issuer: 'https://localhost:8443/realms/strapi-realm',
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