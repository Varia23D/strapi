'use strict';

/**
 * test-post service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test-post.test-post');
