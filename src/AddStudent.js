import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Space } from 'antd';

const AddStudent = ({butName, title, handle, name, setName, phone, setPhone, address, setAddress, initialName, initialPhone, initialAddress}) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Clear the form fields when adding a student and closing the modal
  const handleOk = () => {
    const nameValue = form.getFieldValue('name');
    const phoneValue = form.getFieldValue('phone');
    const addressValue = form.getFieldValue('address');

    if (!nameValue) {
      // Display an error message or take any other action to handle the empty "Name" field
      return;
    }

    if (!addressValue) {
      // Display an error message or take any other action to handle the empty "Phone_no" field
      return;
    }

    if (!phoneValue) {
      // Display an error message or take any other action to handle the empty "Address" field
      return;
    }

    const updatedStudent = {
      name: nameValue,
      phone: phoneValue,
      address: addressValue,
    };

    form.resetFields(); // Clear the form fields
    handle(updatedStudent); // Call the function to add the student
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    // When the modal is opened, set the initial values in the form
    if (isModalOpen) {
      form.setFieldsValue({
        name: initialName,
        phone: initialPhone,
        address: initialAddress,
      });
    }
  }, [isModalOpen, initialName, initialPhone, initialAddress]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {butName}
      </Button>
      <Modal title={title} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please enter a name',
              },
            ]}
          >
            <Input 
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please enter a phone number',
              },
            ]}
          >
            <Input 
              type='number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Please enter a address',
              },
            ]}
          >
            <Input 
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );

}

export default AddStudent