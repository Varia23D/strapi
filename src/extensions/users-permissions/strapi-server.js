module.exports = (plugin) => {
  plugin.controllers.user.updateMe = async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      return ctx.response.status = 401;
    }
    //chose correct user
    const userId = ctx.state.user.id;

    try {
      // Get the new phone number from the request body
      const newPhone = ctx.request.body.data.phone;
      // Update only the phone field in the user data
      await strapi.query('plugin::users-permissions.user').update({
        where: { id: userId },
        data: { phone: newPhone } // Update only the phone field
      });

      ctx.response.status = 200;
    } catch (error) {
      console.error("Error updating user:", error);
      ctx.response.status = 500;
    }
  }

  // custom route
  plugin.routes["content-api"].routes.push(
    {
      method: "PUT",
      path: "/user/me",                         
      handler: "user.updateMe",
      config: {
        prefix: "",
        policies: []
      }
    });

  return plugin;
}
