const DescriboFrameController = require('./api/controllers/DescriboFrameController');
const DescriboFrameService = require('./api/services/DescriboFrameService');
const auth = require('./auth');
const { HookConfig } = require('sails-hook-redbox-hook-config-utils');
const config = require('./hook.json');

module.exports = function (sails) {
  return {
    initialize: async function (cb) {
      const name = require('./package').name;
      const hook = HookConfig.base(name, config);
      await HookConfig.angular({
        hookName: hook.name,
        angularDest: hook.angularDest,
        angularOrigin: hook.angularDest,
        angularTmpDest: hook.angularTmpDest
      });
      HookConfig.views(sails.config.appPath, hook.name);
      cb();
    },
    //If each route middleware do not exist sails.lift will fail during hook.load()
    routes: {
      before: {},
      after: {
        'get /:branding/:portal/describo/info': DescriboFrameController.info,
        '/:branding/:portal/describo': {
          controller: 'RenderViewController',
          action: 'render', locals: {
            'view': 'describo'
          }
        },
        'post /:branding/:portal/describo/session': DescriboFrameController.getSessionId
      }
    },
    configure: function () {
      sails.services['DescriboFrameService'] = DescriboFrameService;
      sails.config = _.merge(sails.config, auth);
    }
  }
};
