interface IAddcar {
    id?:string
    vehicleName: string,
    vehicleNumber: string,
    serviceType: string,
    type: string,
    colour: string,
    fuel: string,
    numofseats: number,
    hubName: string,
    mileage: number,
    fairPrice: number,
    fairKm: number,
    vehiclesingleimage: string,
    vehiclemultipleimage: string[],
    specification: Array<string>,
    vehicleValidityDate: string | number,
    documents: Array<string>,
}