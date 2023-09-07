import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Manage from './Manage';
import apiRequest from './apiRequest';
import { Routes, Route } from 'react-router';
import Missing from './Missing';
import Add from './Add';
import { message } from 'antd';
import New from './New';

function App() {

  const API_URL = 'http://localhost:3500/student';
  const [display, setDisplay] = useState([])
  const [fetchError, setFetchError] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');

  useEffect(() => {
    const fatchData = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error ("Data not received");
        const data = await response.json();
        setDisplay(data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }
    }
    (async () => await fatchData())()
  })

  const handleSubmit = async (e) => {
    const id = display.length ? display[display.length - 1].id + 1 : 1
    const addNewStudent = {id, name: newName, phone_no: newPhone, address: newAddress};
    const data = [...display, addNewStudent]
    setDisplay(data);

    const postOptions = {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify(addNewStudent)
    }

    setNewName('');
    setNewPhone('');
    setNewAddress('');

    const result = await apiRequest(API_URL, postOptions)
    if(result) setFetchError(result)

    // message.success('Successful Added');
    
  }

  const handleDelete = async (id) => {
    const updatedData = display.filter((item) => item.id !== id)
    setDisplay(updatedData)

    const deleteOptions = {
      method: 'DELETE'
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)
    if(result) setFetchError(result)

    message.success('Successful Deleted');
    
  }

  const handleEdit = async (id) => {
    const studentToUpdate = display.find((item) => item.id === id);

    const updatedStudent = {
      id,
      name: editName || studentToUpdate.name, // Use the current value if not changed
      phone_no: editPhone || studentToUpdate.phone_no,
      address: editAddress || studentToUpdate.address,
    };

    const updatedData = display.map(
      (item) => item.id === id ? updatedStudent : item 
    )
    setDisplay(updatedData)
    setEditName('');
    setEditPhone('');
    setEditAddress('');
    
    const reqUrl = `${API_URL}/${id}`;

    const updateOptions = {
      method: 'PATCH',
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify(updatedStudent)
    }
    
    const result = await apiRequest(reqUrl, updateOptions)
    if(result) {
      setFetchError(result)
    }
  }


  return (
    <div className="App">
      <div className='Header'>
        <Header />
      </div>
      <div className='contant'>
        {/* <Routes>
          <Route path='/' element={
            <Manage 
              display = {display}
              fetchError = {fetchError}
              handleDelete = {handleDelete}
              handleSubmit = {handleSubmit}
              handleEdit = {handleEdit}
              newName = {newName}
              setNewName = {setNewName}
              newPhone ={newPhone}
              setNewPhone = {setNewPhone}
              newAddress = {newAddress}
              setNewAddress = {setNewAddress}
              editName = {editName}
              setEditName = {setEditName}
              editPhone = {editPhone}
              setEditPhone = {setEditPhone}
              editAddress = {editAddress}
              setEditAddress = {setEditAddress}
            />
          } />

          <Route path='/add' element={
            <Add 
            />
          } />

          <Route path='*' element={
            <Missing />
          } />
          
        </Routes> */}

        
        <New 
          display = {display}
          fetchError = {fetchError}
          handleDelete = {handleDelete}
          handleSubmit = {handleSubmit}
          handleEdit = {handleEdit}
          newName = {newName}
          setNewName = {setNewName}
          newPhone ={newPhone}
          setNewPhone = {setNewPhone}
          newAddress = {newAddress}
          setNewAddress = {setNewAddress}
          editName = {editName}
          setEditName = {setEditName}
          editPhone = {editPhone}
          setEditPhone = {setEditPhone}
          editAddress = {editAddress}
          setEditAddress = {setEditAddress}
          API_URL ={API_URL}
        />

      </div>
    </div>
  );
}

export default App;
