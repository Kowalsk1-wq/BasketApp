module.exports = {
  info : (request, response) => {
    return response.json({
      app: 'EnvX',
      version: require('../../../package.json').version
    })
  }
}
