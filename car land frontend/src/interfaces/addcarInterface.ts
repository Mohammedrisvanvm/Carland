interface IAddcar {
    id?:string
    vehicleName: string,
    year:string
    vehicleNumber: string,
    colour: string,
    fuel: string,
    numofseats: string,
    hubName: string,
    mileage: string,
    fairPrice: string,
    fairKm: string,
    vehiclesingleimage: string,
    vehiclemultipleimage: string[],
    specification: Array<string>,
    vehicleValidityDate: string | number,
    DocumentVehicle: string,
}