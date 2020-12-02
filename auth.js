/**

 Authentication and authorization configuration

 */
module.exports.auth = {
  rules: [
    {
      path: '/:branding/:portal/describo(/*)',
      role: 'Researcher',
      can_update: true
    }
  ]
};
