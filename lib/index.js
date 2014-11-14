
/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');
var mapper = require('./mapper');

/**
 * Expose `Attribution`
 */

var Attribution = module.exports = integration('Attribution')
  .endpoint('https://track.attributionapp.com')
  .channels(['server', 'mobile', 'client'])
  .ensure('settings.projectId')
  .mapper(mapper)
  .retries(2);

/**
 * Identify.
 *
 * @param {Identify} identify
 * @param {Function} fn
 * @api public
 */

Attribution.prototype.identify = function(payload, fn){
  return this
    .post('/identify')
    .auth(this.settings.projectId)
    .type('.json')
    .send(payload)
    .end(this.handle(fn));
};

/**
 * Set up our prototype methods
 */

Attribution.prototype.track = send;
Attribution.prototype.screen = send;
Attribution.prototype.page = send;

/**
 * Track an event, screen, or page call.
 *
 * @param {Facade} facade
 * @param {Function} fn
 */

function send(payload, fn){
  return this
    .post('/track')
    .auth(this.settings.projectId)
    .type('.json')
    .send(payload)
    .end(this.handle(fn));
}
