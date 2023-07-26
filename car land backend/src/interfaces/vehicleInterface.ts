interface IVehicle extends Document {
    vehicleName: string,
    vehicleNumber: string,
    serviceType: string,
    type: string
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