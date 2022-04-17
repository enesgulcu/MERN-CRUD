import React from 'react';
import { useState, useEffect } from 'react';
// axios içinde export edilen tüm her şey api içinde toplanarak buraya getirilecek
import * as api from '../axios/index.js';

export const SubmitUser = () => {

  //inputtan gelen verileri içinde tutacak bir state tanımladık.
  const [userData, setUserData] = useState({
  name:'',
  surname:'',
  age:'',
  })

  const [allData, setAllData] = useState([]);

  useEffect(() => {

    const getAllUsers = async ()  =>{
      const response = await api.getUsers();
      setAllData(response.data);
  }
  getAllUsers();

  }, [])
  

 
  

  return (   
    <>  
    {        
        allData.map((user_data)=>{
            return <div key={user_data._id}>
              <h5>ID:: {user_data._id}</h5>
              <h5>Name: {user_data.name}</h5>
              <h5>Surname: {user_data.surname}</h5>
              <h5>Age: {user_data.age}</h5>
              <h5>Date: {user_data.createdAt}</h5> 
              <button onClick={()=> api.deleteUser(user_data._id)            }>SİL</button>
              <button onClick={()=> api.updateUser(user_data._id, userData) }>Değiştir</button>
              <hr />           
            </div>
            
        })}

        <button onClick={()=>console.log(allData)}>GETİR</button>
        <form onSubmit={(e)=>{  
          // sayfa submit sonrası yenilemesin diye tanımladık.
          e.preventDefault() 
          // axios içinde veriyi veri tabanına gönderecek olan fonksiyonu çağırdık.
          // verilerin toplandığı state objesini fonksiyona gönderdik.
          api.createUser(userData)
        }}>
            <label htmlFor="name">Name</label>
            <input
              id='name'
              name='name'
              type="text"
              onChange={(e)=>
                // input ile girilen değeri state'e gönderdik.
                setUserData({...userData, name:e.target.value})
              }  
            />
        
            <label htmlFor="surname">Surname</label>
            <input
            id='surname'
            name='surname'
            type="text"
            onChange={(e)=>
              // input ile girilen değeri state'e gönderdik.
              setUserData({...userData, surname:e.target.value})
            }    
            />

            <label htmlFor="age">Age</label>
            <input              
            id='age'
            name='age'
            type="number"
            onChange={(e)=>
              // input ile girilen değeri state'e gönderdik.
              setUserData({...userData, age:e.target.value})
            }   
            />
            <button type='submit'>Gönder</button>        
        </form>
    </>
  )
}
