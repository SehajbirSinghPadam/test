import mongoose from 'mongoose';
export const connectDb =  async ()=>{
    await mongoose.connect('mongodb+srv://singhsehajbir1906:sehajbir1906@cluster0.xy1mp.mongodb.net/food-del').then(()=>console.log("!!!    Db Connected Suceessfully    |||"));

}