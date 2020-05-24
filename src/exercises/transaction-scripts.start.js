const knex = require('knex')(require('../../knexfile'));
const db = require('./database-gateway.start');
const { createDepositCalculator } = require('./strategy.start');

async function rentCar(client_id, car_id) {
    const car = await db.findCar(car_id)
    const clientRentalCount = await db.clientRentalCount(client_id);
    const client = await knex('users').first().where('user_id', client_id);

    const calculator = createDepositCalculator(clientRentalCount, client, car)

    db.rent(car_id, client_id, calculator.calculate())
}

module.exports = { rentCar };
