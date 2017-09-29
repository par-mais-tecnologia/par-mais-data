export default class RdStation {
  token = ''

  fieldMapping = {
    email: 'email',
    name: 'nome',
  }


  constructor() {
    this.rd = window.RdIntegration;
  }

  init(rdToken, appName) {
    this.token = rdToken;
    this.app = appName;
    this.rd.integrate(rdToken, appName, {
      fieldMapping: this.fieldMapping,
    });
  }

  integrate(data) {
    if (this.token === '' || this.rd === undefined) {
      throw new Error('RD Api not ready');
    }

    const result = [];
    Object.keys(data).forEach((item) => {
      const m = this.fieldMapping[item] || item;
      result.push({
        name: m,
        value: data[item],
      });
    });

    result.push(
      ...[
        { name: 'token_rdstation', value: this.token },
        { name: 'identificador', value: this.app },
      ],
    );

    this.rd.post(result);
    return Promise.resolve(data);
  }
}
