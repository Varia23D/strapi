'use strict';

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.state.user) {
      return next();  // Proceed to the next middleware or route handler if the user is authenticated
    } else {
      return ctx.unauthorized("You must be logged in to perform this action");
    }
  };
};
