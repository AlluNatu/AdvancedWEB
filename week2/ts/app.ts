let hello: string = "Hello World!"
console.log(hello)



type TVehicle = {
    model: string,
    color: string,
    year: number,
    power: number
}

let Vechicle: TVehicle = {
    model: "Boring generic vehicle",
    color: "Red",
    year: 1993,
    power: 60
}



console.log(Vechicle)


interface IVehicle {
    model: string,
    color: string,
    year: number,
    power: number
}

interface ICar extends IVehicle{
    bodyType: string,
    wheelCount: number
}

interface IPlane extends IVehicle {
    wingspan:number
}

interface IBoat extends IVehicle{
    draft:number
}

let Car: ICar = {
    model: "Ford focus", 
    color: "Green", 
    year: 2016, 
    power: 150, 
    bodyType: "Hatchback", 
    wheelCount: 4 
}

let Plane:IPlane = {
    model: "Boeing 777", 
    color: "White", 
    year: 2020, 
    power: 170000, 
    wingspan: 65 
}

let Boat:IBoat = {
    model: "Bella", 
    color: "Black", 
    year: 2022, 
    power: 100, 
    draft: 0.42 
}

console.log(Car)
console.log(Plane)
console.log(Boat)

class VehicleService <T>{
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    list(): T[] {
       return this.items 
    }
}

let cars = new VehicleService<ICar>()
let boats = new VehicleService<IBoat>()

cars.add(Car)
boats.add(Boat)

console.log(cars.list());
console.log(boats.list());
