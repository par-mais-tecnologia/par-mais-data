class API {
  document = null
  isLoaded = false
  listeners = {
    load: [],
    notificationStatus: [],
  }

  enforced = false

  onLoad(fn) {
    if (this.isLoaded === true) {
      fn();
    } else {
      this.listeners.load.push(fn);
    }
  }

  onNotificationToggle(fn) {
    this.listeners.notificationStatus.push(fn);
  }

  fire(ev, data = {}) {
    const listeners = this.listeners[ev];
    listeners.forEach(lis => lis(data));
  }

  setup(doc) {
    this.document = doc;

    // Reset Upset Values
    doc.scope.$watch('showNewMessage', (currentValue) => {
      if (currentValue && !this.enforced) {
        doc.scope.showNewMessage = false;
        this.enforced = true;
      }
    });

    doc.scope.$watch('viewToggle', (currentValue, oldValue) => {
      if (currentValue && !oldValue) {
        this.fire('notificationStatus', { status: true });
      } else if (!currentValue && oldValue) {
        this.fire('notificationStatus', { status: false });
      }
    });

    this.isLoaded = true;
    this.fire('load');
  }

}

export default API;
