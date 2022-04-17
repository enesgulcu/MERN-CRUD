import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './Routers/userRouter.js'

// .env ye erişmemizi ve içindeki verileri kullanmamızı sağlar "process.env.PORT" gibi...
dotenv.config();
//express server oluşturuldu.
const app = express();
//post - put ile gönderilen JSON veri yapılarını kullanmamıza yarar bu olmazsa hata alırız.
app.use(express.json({limit: '30mb'}));
// veri gönderiminde engel yaratan politikalardan kaçınmamızı sağlar
app.use(cors());
//http://localhost:5000/users => girildiğinde 
// "userRouter" çalışacak.
app.use('/users', userRouter)

// port numaramızı .env içinden aldık.
const PORT = process.env.PORT || 5000;

// dinleme yapacağı portu belirledik
app.listen(PORT, ()=>{
    // mongo ile bağlantı sağlıyoruz (mongodb den alınan bağlantı kodunu .env den aldık)
    mongoose.connect(process.env.MONGO_CONNECTION_URL,{
        // hata vermemesi için bunları tanımlarız standart bunlar bi anlam arama enes koy geç bunları.
        useNewUrlParser:true,
        useUnifiedTopology: true,
        //useFindAndModify: true  => (yazınca hata veriyor)
    })
    .then(()=>{
        //bağlantı başarılı olursa .Then ile devam eder .
        console.log("Database Bağlantısı Başarılı!");
    })
    .catch((err)=>{
        // Bağlantı başarısız olursa Catch ile hata mesajı döndürürüz.
        console.log("HATA:  " + err);
    })
});