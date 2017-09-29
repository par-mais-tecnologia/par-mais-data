import Pipz from './core/pipz/index';
import RdStation from './core/rd/index';

const DEFAULT_URL = 'http://cloud-alpha.parmais.com.br';

class ParMaisData {
  appName = ''
  currentHost = ''
  rawUrl = ''
  targetUrl = ''

  coreApi = {
    pipz: null,
    rd: null,
  }

  constructor() {
    this.coreApi.pipz = new Pipz();
    this.coreApi.rd = new RdStation();
  }

  init(name, { rdToken }) {
    this.appName = name;

    this.currentHost = '';
    this.host = window.location.host;
    if (this.host.indexOf('localhost') !== -1) {
      this.currentHost = DEFAULT_URL;
    }
    this.rawUrl = `${this.currentHost}/api/par-mais-data/`;
    this.targetUrl = `${this.rawUrl}${this.appName}/`;

    this.coreApi.pipz.load();
    this.coreApi.rd.init(rdToken, this.appName);
  }

  core() {
    return this.coreApi;
  }

  identify(eventName, id, userProperties = undefined, eventData = undefined) {
    return Promise.all([
      this.coreApi.pipz.identify(eventName, id, userProperties, eventData),
      this.coreApi.rd.integrate({
        ...eventData,
        ...userProperties,
      }),
    ]);
  }

  event(name, data = undefined) {
    return this.coreApi.pipz.event(name, data);
  }

  persisData(data) {
    return fetch(this.targetUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...data,
        created: new Date(Date.now()),
      }),
    })
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          throw new Error(json.error);
        }
        return json;
      });
  }

  getData(id) {
    return fetch(`${this.targetUrl}${id}/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          throw new Error(json.error);
        }
        return json;
      });
  }

  buildLink(data) {
    const link = `${this.host}/analise-de-carteira/resultado/${data.id}/`;
    return {
      ...data,
      link,
    };
  }

  pipzator(data) {
    this.coreApi.pipz
      .identify(
        `${this.appName} - Saving Data`,
        data.email,
        this.coreApi.pipz.mapUserData(data),
        this.coreApi.pipz.mapEventData(data))
      .then(() => data)
      .catch((err) => {
        console.log('Pipz data not send');
        console.log(err);
      });
    return data;
  }

  rdzator(data) {
    this.coreApi.rd
      .integrate(data)
      .catch((err) => {
        console.log('RD data not send');
        console.log(err);
      });
    return data;
  }

  send(data) {
    return this.persisData(data)
      .then(persistedData => this.buildLink(persistedData))
      .then(dataWithLink => this.pipzator(dataWithLink))
      .then(dataToRD => this.rdzator(dataToRD))
      .catch(err => console.log(err));
  }

  request(id) {
    return this.getData(id);
  }
}

export default new ParMaisData();
