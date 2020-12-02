export class Config {

  describoHeaders: any;
  describoURL: string;
  brandingAndPortalUrl: string;

  constructor(props) {
    this.describoHeaders = {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + props['token']
    };
    this.describoURL = props['describoURL']
  }


}
