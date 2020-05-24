const knex = require('knex')(require('../../knexfile'));

const db = {
    findCar: async function(car_id) {
        const car = await knex('cars').first().where('car_id', car_id);
        return car;
    },
    clientRentalCount: async function(client_id) {
        const { clientRentalCount }  = await knex('rentals').first().count('client_id as clientRentalCount').where('client_id', client_id);
        return clientRentalCount;
    },
    rent: async function(car_id, client_id, deposit, state = 'RESERVED') {
         await knex('rentals').insert({
            car_id,
            client_id,
            deposit,
            state
        });
    }
};

module.exports = db;
