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
      const returnDate = new Date(publishedAt);
      const open = true // default value of created transaction
      if (!user) {
        return ctx.unauthorized("You are not authorized!");
      }
      const { book } = ctx.request.body.data;
      
      try {
        //fetch info about book type to get loan period info
        const bookCopy = await strapi.entityService.findOne('api::book-copy.book-copy', book, {
          populate: { book_type: true }
        });

        if (!bookCopy || !bookCopy.book_type || !bookCopy.book_type.id) {
          return ctx.badRequest("Invalid book ID or book type not found!");
        }

        let loanPeriod = bookCopy.book_type.loanPeriod
        if (loanPeriod ===null || loanPeriod === undefined) {
          loanPeriod = 1; //default loan period if missed (months)
        }

        returnDate.setMonth(returnDate.getMonth() + loanPeriod)

        const transaction = await strapi.service('api::transaction.transaction').create({
          data: {
            user: ctx.state.user.id, //who did the transaction
            book, //book id
            open, // transaction status on create set to open
            publishedAt, // date of creation
            returnDate, // date of return
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
