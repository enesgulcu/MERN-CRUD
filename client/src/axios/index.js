import axios from 'axios';

//istek yapacağımız URL yi tanımlarız
const API = axios.create({baseURL: 'http://localhost:5000'});

//API.get('/users') ile server'dan verileri alırız
// getUsers içinden bize döndürülen verileri alıp kullanabiliriz.
// tek yapılması gereken verileri kullanacağın yerde bu fonksiyonu çalıştırman.
export const getUsers = async () => API.get('/users');

// veriler "newUser" içinde veri tabanına POST edilecek.
export const createUser = async (newUser) =>{
    //http://localhost:5000/users url'sine "newUser" ile "POST" isteği göndericez.
  const {data} = await API.post('/users', newUser);
  // server POST isteği sonrası bize bir değer göndericek 
  // onu {data} içinde yakaladık ve console'a yazdırdık.
  console.log(data)
}

// gelen id'ye göre silme işlemini uygular
export const deleteUser = async (id) => await API.delete(`/users/${id}`);

// id ile veriyi bulur ve updatedUser ile veriyi değişmesi için gönderir.
export const updateUser = async (id, updatedUser) => await API.put(`/users/${id}`, updatedUser)


