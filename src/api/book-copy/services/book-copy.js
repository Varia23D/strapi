'use strict';

/**
 * book-copy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-copy.book-copy');
