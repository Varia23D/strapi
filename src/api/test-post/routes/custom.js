module.exports = {
  routes: [
    {
        method: 'POST',
        path: '/custom',
        handler: 'test-post.create',
        config: {
          auth: false,
        }
    }
  ]
}