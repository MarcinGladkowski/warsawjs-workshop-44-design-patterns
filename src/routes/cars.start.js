var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../../knexfile'));
const { rentCar } = require('../exercises/transaction-scripts.start');
const EventBus = require('../exercises/pubsub.start');

router.get('/', async function(req, res) {
  const cars = await knex('cars').select('*');
  res.render('cars', { cars, title: 'Samochody do wypożyczenia' });
});

router.get('/:car_id/rent', async function(req, res) {
  const { car_id } = req.params;
  const client_id = req.session.user.user_id;

  const rental = await rentCar(client_id, car_id)

  EventBus.publish('CAR_RENT', {
    client_id, car_id
  });

  res.redirect('/rentals');
});

module.exports = router;
