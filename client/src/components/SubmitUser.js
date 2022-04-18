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
      <h2>MERN - CRUD - simple experiment</h2>
      <hr />
        <button onClick={()=>console.log(allData)}>Fetch all data to Console!</button>
        <form onSubmit={(e)=>{  
          // sayfa submit sonrası yenilemesin diye tanımladık.
          e.preventDefault() 
          // axios içinde veriyi veri tabanına gönderecek olan fonksiyonu çağırdık.
          // verilerin toplandığı state objesini fonksiyona gönderdik.
          api.createUser(userData)
        }}> <br />
            <label htmlFor="name">Name: </label>
            <input
              id='name'
              name='name'
              type="text"
              onChange={(e)=>
                // input ile girilen değeri state'e gönderdik.
                setUserData({...userData, name:e.target.value})
              }  
            /> <br/><br/>
        
            <label htmlFor="surname">Surname: </label>
            <input
            id='surname'
            name='surname'
            type="text"
            onChange={(e)=>
              // input ile girilen değeri state'e gönderdik.
              setUserData({...userData, surname:e.target.value})
            }    
            /> <br/><br/>

            <label htmlFor="age">Age: </label>
            <input              
            id='age'
            name='age'
            type="number"
            onChange={(e)=>
              // input ile girilen değeri state'e gönderdik.
              setUserData({...userData, age:e.target.value})
            }   
            /> <br/><br/>
            <button type='submit'> Create New User </button> <br />        
        </form>
         <hr />     
        {     
      allData.map((user_data)=>{ // list all user data
        return <div key={user_data._id}>
          <ul >
            <li>ID:: {user_data._id}</li>             
            <li>Name: {user_data.name}</li>
            <li>Surname: {user_data.surname}</li>
            <li>Age: {user_data.age}</li>
            <li>Date: {user_data.createdAt}</li> 
            <button onClick={()=> api.deleteUser(user_data._id)}>DELETE</button> <br />
            <button onClick={()=> api.updateUser(user_data._id,userData)}>CHANGE</button>
            <h5>
            ### if you want to UPDATE data, please fill above inputs before click change button <br />
            ### When you click a button, please refresh the page to see the change.
            </h5>            
            <hr />           
          </ul>                    
        </div>         
    })}
    </>
  )
}
