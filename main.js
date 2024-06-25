



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

    renderCars(Cars) {
        console.log('Cars to render',Cars);
        carList.innerHTML="";
        Cars.forEach(car => {
            const html = `<li id=${car.id}>
            <div class="div-picture">
                <p class="brand-name"><b>${car.brandName}</b></p>
                <img class="pic" src="${car.imageURL}"/>
            </div>
            <div class="car-info">
                <p>Brand : ${car.brandName}</p>
                <p>Manufactured Year : ${car.year}</p>
                <p>Doors : ${car.doors}</p>
                <p> Price : $${car.price.toLocaleString()}</p>
            </div>
            <div class="available-info ${car.avaliable === 'Avaliable' ? 'available' : 'unavailable'}">
                <p>Available : ${car.avaliable === 'Avaliable' ? 'Yes' : 'No'}</p>
            </div>
            <button class="delete">Delete</button>
        </li>`;

        carList.insertAdjacentHTML('afterbegin', html);
        });
    
    }

    renderAllCars() {
        carList.innerHTML = ''; 
        this.renderCars(this.Cars);
    }

  

    filterCars(filter){
        
        this.filteredCars = [...this.Cars];
        console.log('array to filter',this.filteredCars);
        if(filter === 'Not avaliable'){
            console.log('filtering - not avaliable');
            this.filteredCars = this.filteredCars.filter(car => car.avaliable === 'Not avaliable');
            this.renderCars(this.filteredCars);
        } else if(filter === 'Avaliable'){
            this.filteredCars = this.filteredCars.filter(car => car.avaliable === 'Avaliable');
            this.renderCars(this.filteredCars);
        } else {
            this.renderAllCars();
        }
    }
   
    sortByPriceLowest(){

        this.filteredCars.sort((a,b) => b.price - a.price);
        this.renderCars(this.filteredCars);
    }
    sortByPriceHighest(){
       
        this.filteredCars.sort((a,b) => a.price - b.price);
        this.renderCars(this.filteredCars);
    }

    sortByBrandAZ(){
        this.filteredCars.sort((a, b) => a.brandName.localeCompare(b.brandName));
        this.renderCars(this.filteredCars);
    }

    sortByBrandZA(){
        this.filteredCars.sort((a, b) => b.brandName.localeCompare(a.brandName));
        this.renderCars(this.filteredCars);
    }
    
    
}

const carData = [{
        brand: 'Toyota',
        year: 2019,
        doors: 4,
        price: '$32,000',
        photoUrl: "img/toyota.jfif",
        avaliable: 'Avaliable'
    },
    {
        brand: 'Honda',
        year: 2020,
        doors: 4,
        price: '$24,000',
        photoUrl: "img/honda.jfif",
        avaliable: 'Not avaliable'
    },
    {
        brand: 'Ford',
        year: 2021,
        doors: 2,
        price: '$28,000',
        photoUrl: "img/ford.jpg",
        avaliable: 'Not avaliable'
    },
    {
        brand: 'Chavrolet',
        year: 2022,
        doors: 4,
        price: '$34,000',
        photoUrl: "img/chavrolet.jfif",
        avaliable: 'Avaliable'
    },
    {
        brand: 'BMW',
        year: 2023,
        doors: 4,
        price: '$20,000',
        photoUrl: "img/car1.jpg",
        avaliable: 'Avaliable'
    }
]

const carManager = new CarManager();

carData.forEach((car) => {
    const newCar = new Car(car.brand, car.year, car.doors, car.price, car.photoUrl, car.avaliable);
    carManager.addCar(newCar);
})

document.addEventListener('DOMContentLoaded', () => {
    carManager.renderAllCars();

    carManager.filteredCars = [...carManager.Cars];


});


carList.addEventListener('click', function(ev) {
    if (ev.target.classList.contains('delete')) {
        const currentLi = ev.target.closest('li');
        console.log(currentLi);
        carManager.deleteCar(currentLi.id); 
    }
});

availabilitySelect.addEventListener('change', function(ev) {
    const filter = availabilitySelect.value;
    console.log(ev.target);
    console.log(filter);
    carManager.filterCars(filter);
});

sortSelect.addEventListener('change', function() {
    
    const sortOption = sortSelect.value;
    if (sortOption === 'Price lowest') {
        carManager.sortByPriceLowest();
    } else if (sortOption === 'Price highest') {
        carManager.sortByPriceHighest();
    } else if (sortOption === 'A-Z') {
        carManager.sortByBrandAZ();
    } else if (sortOption === 'Z-A') {
        carManager.sortByBrandZA();
    }
    
});



