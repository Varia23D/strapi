'use strict';

module.exports = {
  register({ strapi }) {
    strapi.container.get('middlewares').add('global::isAuthenticated', {
      resolve: require('./middlewares/isAuthenticated'),
    });
  },

  bootstrap(/*{ strapi }*/) {},
};
