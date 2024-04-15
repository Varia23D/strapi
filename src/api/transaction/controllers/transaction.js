'use strict';

/**
 * transaction controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::transaction.transaction', 
  ({strapi}) => ({
    async create(ctx) {
      const user = ctx.state.user;
      const publishedAt = new Date();
      const open = true // default value of created transaction
      if (!user) {
        return ctx.unauthorized("You are not authorized!");
      }
      console.log('userdata', ctx.state.user);
      const { book } = ctx.request.body.data;
      
      try {
        const transaction = await strapi.service('api::transaction.transaction').create({
          data: {
            user: ctx.state.user.id, //who did the transaction
            book, //book id
            open, // transaction status on create set to open
            publishedAt, // date of creation
          },
        });
        
        return transaction;
      } catch (err) {
        console.log("err", err);
        ctx.response.status = 500;
        return {
          error: { message: "There was a problem creating the test post" },
        };
      }
    },
    async find(ctx) {
      // some logic here
      const { data, meta } = await super.find(ctx);
      // some more logic
    
      return { data, meta };
    }

  }));
