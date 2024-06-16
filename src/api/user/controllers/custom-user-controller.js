'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::users-permissions.user', ({ strapi }) => ({
                                        // Define the updateMe method
  async updateMe(ctx) {
    const user = ctx.state.user;        // Get the currently user from the context
    const { phone } = ctx.request.body; // Extract the phone number from the request body

    if (!user) {                        // Check if the user is authenticated
      return ctx.unauthorized("You can't update this entry");
    }

    if (!/^(\+\d{1,3}\d{8,9}|0\d{8,9})$/.test(phone)) {
      ctx.badRequest('Invalid phone number format');  // Return error if invalid
      return;
    }

    try {
      // Update the user's phone number in the database
      const updatedUser = await strapi.plugin('users-permissions').service('user').edit(user.id, { phone });
      ctx.send({ user: updatedUser });
    } catch (error) {
      ctx.badRequest('An error occurred');
    }
  },
}));
