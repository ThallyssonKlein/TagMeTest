module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/listOrders',
          permanent: true,
        },
      ]
    },
  }