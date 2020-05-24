// source: https://davidwalsh.name/pubsub-javascript
const knex = require('knex')(require('../../knexfile'));
const debug = require('debug')('app:event-bus');
const { runInBatch } = require('../exercises/decorator.start') 

let topics = {};

const EventBus = {

  subscribe(topicName, callback) {
    if (!topics[topicName]) {
      topics[topicName] = [];
    }
    topics[topicName].push(callback);
  },

  publish(topicName, data = {}) {
    if (!topics[topicName]) return;
    topics[topicName].forEach(callback => {
      callback(data)
    });
  } 
};

const notify = (rental) => {
  knex('users')
    .first()
    .where('user_id', rental.client_id)
    .then((client) => {
      debug('Send confirmation mail to: ' + client.mail);
    });
};

EventBus.subscribe('CAR_RENT', runInBatch(notify))

module.exports = EventBus;
