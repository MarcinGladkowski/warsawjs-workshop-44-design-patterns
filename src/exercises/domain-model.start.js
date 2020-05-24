class Rental {
    constructor(rental_id, car_id, client_id, deposit, state) {
        this.rental_id = rental_id;
        this.car_id = car_id;
        this.client_id = client_id;
        this.deposit = deposit;
        this.state = state;
    }

    payDeposit() {
        if (this.state !== 'RESERVED') {
            debug('Method not allow on rental: ' + this.rental_id);
        }
    }

    returnDeposit() {
        if (this.state !== 'DEPOSIT_PAID' && this.state !== 'CAR_RETURNED') {
            debug('Method not allow on rental: ' + this.rental_id);
        }
    }
}

module.exports = Rental;
