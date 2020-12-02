import {Sails, Model} from 'sails';
import moment = require('moment');
import axios from 'axios';

const qs = require('qs');
const util = require('util');
const services = require('sails-hook-redbox-hook-config-utils').CoreService;

declare var sails: Sails;
declare var _;
declare var RecordsService, TranslationService, WorkflowStepsService;

export module Services {
  export class DescriboFrameService extends services.Services.Core.Service {

    protected _exportedMethods: any = [
      'getSessionId',
    ];

    async getSessionId(config, user) {
      console.log('getSessionId::service');
      const instance = axios.create({
        baseURL: config.describoURL,
        timeout: 1000,
        headers: config.describoHeaders
      });
      const url = `/api/session/application`;
      let response = null;
      try {
        response = await instance.post(url, {email: user.email, name: user.displayname});
        return response.data;
      } catch (err) {
        sails.log.verbose(err);
        throw TypeError(err);
      }

    }
  }
}
module.exports = new Services.DescriboFrameService().exports();
