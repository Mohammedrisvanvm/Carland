interface IVehicle extends Document {
    save(): unknown
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
    vehiclesingleimage :string,
    vehiclemultipleimage:Array<string>,
    vehicleValidityDate:string,
    hubId?:string
    ban:boolean
}

export default IVehicle