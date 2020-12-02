"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
const controller = require('sails-hook-redbox-hook-config-utils').CoreController;
const Config_1 = require("../Config");
var Controllers;
(function (Controllers) {
    class DescriboFrameController extends controller.Controllers.Core.Controller {
        constructor() {
            super();
            this._exportedMethods = [
                'info',
                'getSessionId'
            ];
            this.config = new Config_1.Config(sails.config.describo);
        }
        info(req, res) {
            this.config.brandingAndPortalUrl = BrandingService.getFullPath(req);
            sails.log.verbose('describo::info::');
            this.ajaxOk(req, res, null, { status: true });
        }
        getSessionId(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('getSessionId::controller');
                sails.log.debug(sails.config.describo);
                this.config.brandingAndPortalUrl = BrandingService.getFullPath(req);
                const user = req.user;
                try {
                    sails.log.debug(user.email);
                    sails.log.debug(this.config);
                    const data = yield DescriboFrameService.getSessionId(this.config, user);
                    const url = this.config.describoURL + '/application?sid=' + data.sessionId;
                    sails.log.debug(url);
                    this.ajaxOk(req, res, null, { status: true, url: url });
                }
                catch (error) {
                    sails.log.debug(error);
                    const errorMessage = 'There was an error connecting to describo online. Please contact support team';
                    sails.log.error(`${errorMessage} ${error.message}`);
                    this.ajaxFail(req, res, error.message, { status: false, message: errorMessage });
                }
            });
        }
    }
    Controllers.DescriboFrameController = DescriboFrameController;
})(Controllers = exports.Controllers || (exports.Controllers = {}));
module.exports = new Controllers.DescriboFrameController().exports();
