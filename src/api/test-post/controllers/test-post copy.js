'use strict';

/**
 * test-post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::test-post.test-post', 
  ({strapi}) => ({
  async create(ctx) {

    const response = await super.create(ctx);
    try {
      
    } catch (err) {
      ctx.body = err
    }
    return response;
  }
}));
