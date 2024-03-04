// test-post.js

'use strict';

/**
 * test-post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::test-post.test-post', 
  ({strapi}) => ({
    async create(ctx) {
      const user = ctx.state.user;
  
      if (!user) {
        return ctx.unauthorized("You are not authorized!");
      }
      console.log('userdata', ctx.state.user);
      const { title, description } = ctx.request.body.data;
      
      try {
        const loan = await strapi.service('api::test-post.test-post').create({
          data: {
            user: ctx.state.user.id,
            title,
            description,
            publishedAt: new Date(),
          },
        });
        
        return loan;
      } catch (err) {
        console.log("err", err);
        ctx.response.status = 500;
        return {
          error: { message: "There was a problem creating the test post" },
        };
      }
    },
}));
