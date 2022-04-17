import express from 'express';
import mongoose from 'mongoose';
import User from '../DB/model.js';

const router = express.Router();

//http://localhost:5000/users/ adresinde çalışır.
// req => bize gelen istek
// res => verdiğimiz cevap
router.get('/', async (req,res)=>{
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      res.status(404).json({message: error.message})
  }
});

router.get('/:id', async(req,res)=>{
 try {
    const {id} =  req.params //link deki sonunda olan id değerini yakalar.
    // aşağıda, gelen id değerini mongo db ile uyumlu olup olmadığını sorgularız
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message:'veri doğrulanamadı'})
    }
    else{
        // mongodb den veriyi sorguladığımız yer !!!
        const user = await User.findById(id)
        if(!user) return;
        // eğer gelen bir değer varsa o değeri kendimize döndürürüz
        res.status(200).json(user)
    }  
 }
    catch (error) {
        res.status(404).json({message:'veri Bulunamadı !'})
 }
});

router.post('/', async (req,res)=>{
    try {
        // body içinden post edilen veriyi aldık
        const user = req.body;
        // yeni bir model üretip verileri içine aktardık
        const createUser = await User.create(user)

        res.status(201).json(createUser);
    } catch (error) {
        res.json({message: "User Create Failed"})
    }
});

router.put('/:id',async (req,res)=>{
    const {id} =  req.params //link deki sonunda olan id değerini yakalar.

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message:'put verisi doğrulanamadı'})
    }
    // değişim için gönderilen verileri bod'den yakaladk ve aldık.
    const {name, surname, age} = req.body;

    const updateUser = await User.findByIdAndUpdate(
        id, //eşleşdiği veriyi alır
        {name,surname,age}, // soldak iverileri değiştirir
        {new: true} 
        )
});

router.delete('/:id', async (req,res)=>{
    const {id} =  req.params //link deki sonunda olan id değerini yakalar.
    const deleteUser = await User.findByIdAndDelete(id);
});

export default router