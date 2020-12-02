import {Injectable, Inject} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';

import {BaseService} from './shared/base-service';
import {ConfigService} from './shared/config-service';

@Injectable()
export class DescriboService extends BaseService {
  constructor(@Inject(Http) http: Http, @Inject(ConfigService) protected configService: ConfigService) {
    super(http, configService);
  }

  public async getSessionId(user) {
    const describoUser = {
      email: user.email,
      name: user.displayname
    }
    const wsUrl = this.brandingAndPortalUrl + '/describo/session';
    try {
      const result = await this.http.post(
          wsUrl,{
            describoUser: describoUser
          },
          this.options
      ).toPromise();
      return Promise.resolve(this.extractData(result));
    } catch (e) {
      return Promise.reject(new Error(e));
    }
  }
}
