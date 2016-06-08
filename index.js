module.exports = function(service) {
  return {
    sessions: require('./libs/sessions')(service)
  }
};
