interface IVehicle extends Document {
    save(): unknown
    _id:string
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
    DocumentVehicle: string,
    vehiclesingleimage :string,
    vehiclemultipleimage:Array<string>,
    vehicleValidityDate:string,
    hubId?:string
    ban:boolean
   
}
interface IVehicle {
    vehicleData:IVehicle[]
}

export default IVehicle