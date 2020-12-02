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
const axios_1 = require("axios");
const qs = require('qs');
const util = require('util');
const services = require('sails-hook-redbox-hook-config-utils').CoreService;
var Services;
(function (Services) {
    class DescriboFrameService extends services.Services.Core.Service {
        constructor() {
            super(...arguments);
            this._exportedMethods = [
                'getSessionId',
            ];
        }
        getSessionId(config, user) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('getSessionId::service');
                const instance = axios_1.default.create({
                    baseURL: config.describoURL,
                    timeout: 1000,
                    headers: config.describoHeaders
                });
                const url = `/api/session/application`;
                let response = null;
                try {
                    response = yield instance.post(url, { email: user.email, name: user.displayname });
                    return response.data;
                }
                catch (err) {
                    sails.log.verbose(err);
                    throw TypeError(err);
                }
            });
        }
    }
    Services.DescriboFrameService = DescriboFrameService;
})(Services = exports.Services || (exports.Services = {}));
module.exports = new Services.DescriboFrameService().exports();
