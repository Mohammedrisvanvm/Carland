interface IVehicle extends Document{
    carName: string,
    carNumber: Number,
    serviceType: string,
    type:string
    image: Array<string>,
    colour: string,
    fuel: string,
    numofseats: Number,
    hubName: string,
    mileage: Number,
    fairPrice: Number,
    fairKm: Number,
    status: Boolean,
    specification: Array<string>,
    vehicleValidate: Date,
    documents: Array<string>,
}

export default IVehicle