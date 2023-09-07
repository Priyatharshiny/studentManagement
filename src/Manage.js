import React from 'react'
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import AddStudent from './AddStudent';
import { Button, Popconfirm } from 'antd';

const Manage = ({display, handleSubmit, fetchError, handleDelete, handleEdit, newName, setNewName, newPhone, setNewPhone, newAddress, setNewAddress, editName, setEditName, editPhone, setEditPhone, editAddress, setEditAddress}) => {

    return (
    <div>
        <div className='main-headers'>
            <h2>Manage Student</h2>
            
            <AddStudent 
                title = "Add Student" 
                butName = "Create"
                handle = {handleSubmit}
                name = {newName}
                setName = {setNewName}
                phone ={newPhone}
                setPhone = {setNewPhone}
                address = {newAddress}
                setAddress = {setNewAddress}
            />
        </div>
        
        <div className='Table'>
            <table cellspacing="5px">
                <thead>
                    <th>No</th>
                    <th>Name</th>
                    <th>Phone no</th>
                    <th>Address</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr>
                        <td  colspan="5">
                            {fetchError && <h4>{`Error: ${fetchError}`}</h4>}
                        </td>
                    </tr>

                    {!fetchError && display.map( (item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.phone_no}</td>
                            <td>{item.address}</td>
                            <td>
                                <AddStudent 
                                    title = "Update Student" 
                                    butName = "Update"
                                    handle = {() => handleEdit(item.id)}
                                    name = {editName}
                                    setName = {setEditName}
                                    phone ={editPhone}
                                    setPhone = {setEditPhone}
                                    address = {editAddress}
                                    setAddress = {setEditAddress}
                                    initialName={item.name}
                                    initialPhone={item.phone_no}
                                    initialAddress={item.address}
                                />
                                <span> </span>
                                
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => handleDelete(item.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger >Delete</Button>
                                </Popconfirm>
                            </td>
                                
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Manage