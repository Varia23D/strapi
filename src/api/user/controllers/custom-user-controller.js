'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::users-permissions.user', ({ strapi }) => ({
  async updateMe(ctx) {
    const user = ctx.state.user;
    const { phone } = ctx.request.body;

    if (!user) {
      return ctx.unauthorized("You can't update this entry");
    }

    try {
      const updatedUser = await strapi.plugin('users-permissions').service('user').edit(user.id, { phone });
      ctx.send({ user: updatedUser });
    } catch (error) {
      ctx.badRequest('An error occurred');
    }
  },
}));
