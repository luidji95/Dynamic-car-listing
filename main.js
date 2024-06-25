const carList = document.querySelector('.car-list');
const availabilitySelect = document.getElementById('select-sort');
const sortSelect = document.getElementById('select');



class Car {
    constructor(brandName, year, doors, price, imageURL, avaliable) {
        this.id = crypto.randomUUID();
        this.brandName = brandName;
        this.year = year;
        this.doors = doors;
        this.price = parseInt(price.substring(1).replace(',', ''));
        this.imageURL = imageURL;
        this.avaliable = avaliable;
    }
}

class CarManager {
    constructor() {
        this.Cars = [];
        this.filteredCars = [];
    }

    addCar(car) {
        this.Cars.push(car);
    }

    deleteCar(id) {
        this.Cars = this.Cars.filter(car => car.id !== id);
        this.renderAllCars();
    }
}