// mongodb model oluşturmak için "mongoose" import ederiz
import mongoose from "mongoose";

// Örnek bir Model yapısını aşağıda oluştururuz.
// veri tabanına bu şekilde kayıt edecek
const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    surname:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
})
// MongoDB'nin içine model olarak kayıt ederiz.
// Not: "user" Collectionun adı olmalıdır. mongoDB nin içindeki tablomuzun ismi gibi yani.
const User = mongoose.model("user", userSchema)

// en son tanımlanan "User" Modelini export ederiz.
export default User;