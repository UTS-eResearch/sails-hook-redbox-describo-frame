### Sails Hook Redbox Describo Frame

Simple plugin for redbox to hook up describo online

#### Environment Base Config

in redbox 

`config/env/docker|deveoplent|production`

example:
```javascript
module.exports = {
  describo: {
    describoURL: 'https://describo-dev.research.uts.edu.au',
    token: 'XXX-XXX-XXX'
  }
}
```

For development purposes you can use docker-compose.yml in redbox

in the environment section of redboxportal

```yaml
services:
  redboxportal:
...
  environment:
      - sails_describo__token=XXX-XXX-XXX
      - sails_describo__describoURL=https://describo-dev.research.uts.edu.au
```
