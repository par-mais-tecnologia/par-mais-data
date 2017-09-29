import API from './api';
import load from './load';

export default class Pipz {
  constructor() {
    this.API = new API();
  }

  event(name, data = undefined) {
    return new Promise((resolve) => {
      if (window.pipz === undefined) {
        return resolve();
      }
      window.pipz.track(name, data);
      return resolve();
    });
  }

  identify(eventName, id, userProperties = undefined, eventData = undefined) {
    return new Promise((resolve) => {
      if (window.pipz === undefined) {
        return resolve();
      }

      const pipzMessage = {
        ...userProperties,
      };
      pipzMessage.event = {};
      pipzMessage.event[eventName] = eventData;

      window.pipz.identify(id, Object.assign(pipzMessage, eventData));
      return resolve();
    });
  }

  load() {
    return load()
      .then((doc) => {
        if (doc !== undefined) {
          this.document = doc;
          window.ddd = doc;
          this.API.setup(doc);
        }
      });
  }

  mapUserData(entity) {
    return {
      name: entity.name,
      email: entity.email,
      birthdate: entity.bornDate,
    };
  }

  mapEventData(entity) {
    return {
      ...entity,
      nome: entity.name,
      nascimento: entity.bornDate,
      genero: entity.gender,
    };
  }
}
