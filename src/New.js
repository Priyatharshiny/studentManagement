import React from 'react'
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import AddStudent from './AddStudent';
import { Button, Popconfirm,  Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

const New = ({display, handleSubmit, fetchError, handleDelete, handleEdit, newName, setNewName, newPhone, setNewPhone, newAddress, setNewAddress, editName, setEditName, editPhone, setEditPhone, editAddress, setEditAddress}) => {

    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const generateSerialNumbers = (data) => {
    return data.map((item, index) => index + 1);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
     filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
        width: '4%',
        render: (text, record, index) => generateSerialNumbers(display)[index],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_no',
      key: 'age',
      width: '20%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: '21%',
        render: (text, item) => (
          <span>
            <AddStudent
              title="Update Student"
              butName="Update"
              handle={() => handleEdit(item.id)} // Assuming 'key' is the unique identifier
              name={editName}
              setName={setEditName}
              phone={editPhone}
              setPhone={setEditPhone}
              address={editAddress}
              setAddress={setEditAddress}
              initialName={item.name}
              initialPhone={item.phone_no} // Assuming 'age' is the phone number
              initialAddress={item.address}
            />
            <span> </span>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDelete(item.id)} // Assuming 'key' is the unique identifier
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </span>
        ),
      },
  ];

  const paginationConfig = {
    pageSize: 5, // Number of items per page
  };
  
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
        

        <Table columns={columns} dataSource={display} pagination={paginationConfig} />

    </div>
  )
}

export default New