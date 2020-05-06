module.exports = {
  info : (request, response) => {
    return response.json({
      app: 'BasketApp',
      version: require('../../../package.json').version
    })
  }
}
