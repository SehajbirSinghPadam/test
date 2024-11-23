import mongoose from 'mongoose';
export const connectDb =  async ()=>{
    await mongoose.connect('mongodb+srv://princekumar8574:root@cluster0.rmipx.mongodb.net/Snap-bite').then(()=>console.log("!!!    Db Connected Suceessfully  "));

}  

