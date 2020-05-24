function createDepositCalculator(clientRentalCount, client, car) {
    let calculator = null;
    if (clientRentalCount < 1 && !client.isVip) {
        calculator = new FirstClientCalculatorStrategy(car.price)
      } else if (clientRentalCount >= 1 && !client.isVip) {
        calculator = new ReturnedClientCalculatorStrategy(car.price)
      } else if (client.isVip) {
        calculator = new VipCalculatorStrategy(car.price)
    }
    return calculator;
}

module.exports = { createDepositCalculator };

class DepositCalculator {

    constructor(carPrice) {
        this.carPrice = carPrice
    }

    calculate() {
        throw new Error('subclass responsibility')
    }
}

class VipCalculatorStrategy extends DepositCalculator {

    constructor(carPrice, minDeposit, maxDeposit) {
        super(carPrice)

        
    }

    calculate() {
        // 5000, 40000 are magic numbers - to refactor!
        return Math.min(Math.max(5000, this.carPrice * 0.1), 40000);
    }
}

class ReturnedClientCalculatorStrategy extends DepositCalculator {
    calculate() {
        return Math.min(Math.max(10000, this.carPrice * 0.15), 60000);
    }
}

class FirstClientCalculatorStrategy extends DepositCalculator {
    calculate() {
        return Math.max(10000, this.carPrice * 0.2);
    }
}