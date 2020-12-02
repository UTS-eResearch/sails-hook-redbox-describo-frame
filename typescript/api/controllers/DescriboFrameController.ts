declare var module;
declare var sails, Model;
declare var _;

import {Observable, throwError} from 'rxjs';
import 'rxjs/add/operator/map';

declare var BrandingService, WorkspaceService, DescriboFrameService;
/**
 * Package that contains all Controllers.
 */
const controller = require('sails-hook-redbox-hook-config-utils').CoreController;
import {Config} from '../Config';

export module Controllers {

  /**
   * DescriboFrame related features....
   *
   */
  export class DescriboFrameController extends controller.Controllers.Core.Controller {

    protected _exportedMethods: any = [
      'info',
      'getSessionId'
    ];

    protected config: Config;

    constructor() {
      super();
      this.config = new Config(sails.config.describo);
    }

    public info(req, res) {
      this.config.brandingAndPortalUrl = BrandingService.getFullPath(req);
      sails.log.verbose('describo::info::');
      this.ajaxOk(req, res, null, {status: true});
    }

    public async getSessionId(req, res) {
      console.log('getSessionId::controller');
      sails.log.debug(sails.config.describo);
      this.config.brandingAndPortalUrl = BrandingService.getFullPath(req);
      const user = req.user;
      try {
        sails.log.debug(user.email);
        sails.log.debug(this.config);
        const data = await DescriboFrameService.getSessionId(this.config, user);
        const url = this.config.describoURL + '/application?sid=' + data.sessionId;
        sails.log.debug(url);
        this.ajaxOk(req, res, null, {status: true, url: url});
      } catch (error) {
        sails.log.debug(error);
        const errorMessage = 'There was an error connecting to describo online. Please contact support team';
        sails.log.error(`${errorMessage} ${error.message}`);
        this.ajaxFail(req, res, error.message, {status: false, message: errorMessage});
      }
    }


  }
}
module.exports = new Controllers.DescriboFrameController().exports();
