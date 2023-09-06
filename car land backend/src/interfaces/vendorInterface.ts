interface IVendor extends Document {
    _id: string;
    userName: string;
    email: string;
    phoneNumber?: number;
    renthubs?:Array<string>
    image?: string;
    verified_number?: boolean;
    ban?: boolean;
    createdAt: Date;
    updatedAt: Date;
   
}

export default IVendor