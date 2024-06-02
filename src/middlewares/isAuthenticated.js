'use strict';

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.state.user) {
      return next();
    } else {
      return ctx.unauthorized("You must be logged in to perform this action");
    }
  };
};
