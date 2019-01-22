const errorHandler = require('../error-handler');
const makeDebug = require('debug');
const Base = require('./base');

const debug = makeDebug('feathers-stripe:source');

module.exports = class Service extends Base {
  get (id) {
    return this.stripe.sources.retrieve(id).catch(errorHandler);
  }

  create (data, params) {
    if (params.customer) {
      return this.stripe.customers
        .createSource(params.customer, data)
        .catch(errorHandler);
    }
    return this.stripe.sources.create(data).catch(errorHandler);
  }

  patch (id, data) {
    return this.update(id, data);
  }

  update (id, data) {
    return this.stripe.sources.update(id, data).catch(errorHandler);
  }

  remove (id, params) {
    if (!params || !params.customer) {
      debug('Missing Stripe customer id');
    }
    return this.stripe.customers
      .deleteSource(params.customer, id)
      .catch(errorHandler);
  }
};
