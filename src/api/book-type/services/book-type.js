'use strict';

/**
 * book-type service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-type.book-type');
