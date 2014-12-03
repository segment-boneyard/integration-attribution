
/**
 * Module Dependencies.
 */

var traverse = require('isodate-traverse');
var convert = require('convert-dates');
var merge = require('merge-util');

/**
 * Map `track`.
 *
 * @param {Track} track
 * @return {Object}
 * @api private
 */

exports.track = function(track){
  return merge(base(track), {
    event: track.event()
  });
};

/**
 * Map `identify`.
 *
 * @param {Identify} msg
 * @return {Object}
 * @api private
 */

exports.identify = function(identify){
  return {
    user_id: identify.userId(),
    cookie_id: identify.sessionId(),
    traits: convertDates(identify.traits()),
    context: convertDates(identify.context())
  };
};

/**
 * Map `page`.
 *
 * @param {Page} page
 * @return {Object}
 * @api private
 */

exports.page = function(page){
  return merge(base(page), {
    event: page.event(page.name())
  });
};

/**
 * Map `screen`.
 *
 * @param {Screen} page
 * @return {Object}
 * @api private
 */

exports.screen = function(screen){
  return merge(base(screen), {
    event: screen.event(screen.name())
  });
};

/**
 * Base.
 */

function base(object) {
  return {
    user_id:    object.userId(),
    timestamp:  object.timestamp().toISOString(),
    cookie_id:  object.sessionId(),
    properties: convertDates(object.properties()),
    context:    convertDates(object.context())
  };
};

/**
 * Convert dates.
 */

function convertDates(obj){
  obj = traverse(obj);
  return convert(obj, function(date){
    return date.toISOString();
  });
}
