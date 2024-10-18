import React, { useState } from 'react';
import { Form, Input, Button, Steps, Checkbox, Upload, Spin, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';



import axios from 'axios';
import * as XLSX from 'xlsx';
import LocationPicker from './LocationPicker'; // Import the LocationPicker component
import './HospitalRegistrationForm.css';
import { nav } from 'framer-motion/client';
 // Import the CSS file

const { Step } = Steps;
const { TextArea } = Input;


const imageLinks = [
  'https://drive.google.com/file/d/1SdgcTDfeBnRlZygm9XXT9XQa1SazVQO8/view?usp=sharing',
  'https://drive.google.com/file/d/1J9FwXID8OYHTzRMa5HF-FyFQ9hJ_zBPW/view?usp=sharing',
  'https://drive.google.com/file/d/1NE5HUJTxDaCEo2aMxseVVCkNXi800RWr/view?usp=sharing',
  'https://drive.google.com/file/d/1XsOX0QLGHfbpCik0SOP4KgJBNlTipjEC/view?usp=sharing',
  'https://drive.google.com/file/d/1SdgcTDfeBnRlZygm9XXT9XQa1SazVQO8/view?usp=sharing',
  'https://drive.google.com/file/d/1J9FwXID8OYHTzRMa5HF-FyFQ9hJ_zBPW/view?usp=sharing',
  'https://drive.google.com/file/d/1NE5HUJTxDaCEo2aMxseVVCkNXi800RWr/view?usp=sharing',
  'https://drive.google.com/file/d/1XsOX0QLGHfbpCik0SOP4KgJBNlTipjEC/view?usp=sharing',
  'https://drive.google.com/file/d/1B-b1YsZqXvMDA7pqsKy65_z_O5-jBFdo/view?usp=sharing',
  'https://drive.google.com/file/d/1KFbG-Nj-IdTRwdlROblDORTFU6RxUQyt/view?usp=sharing',
];

const HospitalRegistrationForm = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactNumber: '',
    email: '',
    password:'',
    openingTime: '',
    closingTime: '',
    servicesOffered: [],
    numberOfBeds: '',
    departments: [],
    staffDetails: [],
    website: '',
    hospitalDescription: '',
    latitude: '',
    longitude: '',
  });
  const [newItem, setNewItem] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [listItems, setListItems] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLocationSubmit = (coords) => {
    setFormData({ ...formData, latitude: coords.lat, longitude: coords.lng });
    setShowLocationPicker(false); // Hide the LocationPicker after selecting coordinates
  };
  const handleExcelUploadChange = (event) => {
        const file = event.target.files[0];
        const validFileTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
          'application/vnd.ms-excel'
        ];
      
        if (file && !validFileTypes.includes(file.type)) {
          alert("Please upload a valid Excel file (.xlsx or .xls)");
          event.target.value = '';
          return
        }
        parseExcel(file);

  };
  

  const parseExcel = (file) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const dataRows = rows.slice(1);
      // Process rows and add random image links
      const staffDetails = dataRows.map((row) => ({
        ...row,
        image: getRandomImageLink(),
      }));
      console.log(staffDetails);
      setFormData({ ...formData, staffDetails });
      setLoading(false);
      message.success('Excel file parsed successfully!');
    };
    reader.readAsArrayBuffer(file);
  };

  const getRandomImageLink = () => {
    return imageLinks[Math.floor(Math.random() * imageLinks.length)];
  };

  const handleDelete = (itemId) => {
    const updatedListItems = listItems.filter(item => item._id !== itemId);
    setListItems(updatedListItems);
    console.log(updatedListItems);
  
    // Update formData.servicesOffered
    const updatedServicesOffered = formData.servicesOffered.filter(item => item._id !== itemId);
    setFormData({ ...formData, servicesOffered: updatedServicesOffered });
  };
  
  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      const newItemObj = { _id: Date.now().toString(), name: newItem };
      const updatedListItems = [...listItems, newItemObj];
      setListItems(updatedListItems);
  
      // Update formData.servicesOffered with the new item object
      setFormData({ ...formData, servicesOffered: [...formData.servicesOffered, newItemObj] });
      console.log(updatedListItems);
      setNewItem('');
    }
  };
  
  const handleDeleteDepartment = (itemId) => {
    const updatedDepartmentsList = departmentsList.filter(item => item._id !== itemId);
    setDepartmentsList(updatedDepartmentsList);
  
    // Update formData.departments
    const updatedDepartments = formData.departments.filter(item => item._id !== itemId);
    setFormData({ ...formData, departments: updatedDepartments });
  };
  
  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (newDepartment.trim()) {
      const newDepartmentObj = { _id: Date.now().toString(), name: newDepartment };
      const updatedDepartmentsList = [...departmentsList, newDepartmentObj];
      setDepartmentsList(updatedDepartmentsList);
  
      // Update formData.departments with the new department object
      setFormData({ ...formData, departments: [...formData.departments, newDepartmentObj] });
      console.log(updatedDepartmentsList);
      setNewDepartment('');
    }
  };
  


 

  const getMetrics = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude.toString();
          const longitude = position.coords.longitude.toString();

          setFormData({
            ...formData,
            latitude: latitude,
            longitude: longitude,
          });
          setShowLocationPicker(true); // Show the LocationPicker
         
        },
        (error) => {
          alert('Error getting location. Please allow location access.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };



  const steps = [
    {
      title: 'Basic Information',
      content: (
        <div>
          <Form.Item
            name="hospitalName"
            label="Hospital Name"
            rules={[{ required: true, message: 'Hospital Name is required' }]}
          >
            <Input name="hospitalName" value={formData.hospitalName} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Address is required' }]}
          >
            <TextArea name="address" value={formData.address} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'City is required' }]}
          >
            <Input name="city" value={formData.city} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: 'State is required' }]}
          >
            <Input name="state" value={formData.state} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="pincode"
            label="Pincode"
            rules={[{ required: true, message: 'Pincode is required' }]}
          >
            <Input name="pincode" value={formData.pincode} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[{ required: true, message: 'Must be a valid phone number' }]}
          >
            <Input name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Must be a valid email address' }]}
          >
            <Input name="email" value={formData.email} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Must Contain captial letters, small letters, and special Charachters' }]}
          >
            <Input name="password" value={formData.password} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="openingTime"
            label="Opening Time"
            rules={[{ required: true, message: 'Opening Time is required' }]}
          >
            <Input type="time" name="openingTime" value={formData.openingTime} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="closingTime"
            label="Closing Time"
            rules={[{ required: true, message: 'Closing Time is required' }]}
          >
            <Input type="time" name="closingTime" value={formData.closingTime} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="numberOfBeds"
            label="Number of Beds"
          >
            <Input name="numberOfBeds" value={formData.numberOfBeds} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[{ type: 'url', message: 'Must be a valid URL' }]}
          >
            <Input name="website" value={formData.website} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="hospitalDescription"
            label="Hospital Description"
          >
            <TextArea name="hospitalDescription" value={formData.hospitalDescription} onChange={handleChange} />
          </Form.Item>
          
          
          <Button type="primary" onClick={getMetrics}>
            Get Metrics
          </Button>
          {showLocationPicker && (
            <LocationPicker onSubmit={handleLocationSubmit} />
          )}
        </div>
      ),
    },
    {
      title: 'Services Offered',
      content: (
        <div>
          <div className="box">
            {listItems.map((item) => (
              <div key={item._id} className="item">
                <Checkbox
                  value={item._id}
                  onChange={() => handleDelete(item._id)}
                >
                  {item.name}
                </Checkbox>
              </div>
            ))}
            <Form.Item className="item">
              <Input
                type="text"
                name="newItem"
                value={newItem}
                placeholder="New Item"
                autoComplete="off"
                onChange={(e) => setNewItem(e.target.value)}
              />
              <Button type="primary" onClick={handleAddItem}>
                <PlusOutlined />
              </Button>
            </Form.Item>
          </div>
        </div>
      ),
    },
    {
      title: 'Departments',
      content: (
        <div>
          <div className="box">
            {departmentsList.map((item) => (
              <div key={item._id} className="item">
                <Checkbox
                  value={item._id}
                  onChange={() => handleDeleteDepartment(item._id)}
                >
                  {item.name}
                </Checkbox>
              </div>
            ))}
            <Form.Item className="item">
              <Input
                type="text"
                name="newDepartment"
                value={newDepartment}
                placeholder="New Department"
                autoComplete="off"
                onChange={(e) => setNewDepartment(e.target.value)}
              />
              <Button type="primary" onClick={handleAddDepartment}>
                <PlusOutlined />
              </Button>
            </Form.Item>
          </div>
        </div>
      ),
    },
    {
      title: 'Staff Details',
      content: (
        <div>
        <Spin spinning={loading} tip="Processing...">
          
          <input
  type="file" 
  accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
  onChange={handleExcelUploadChange} 
/>

          
          </Spin>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setCurrent(current + 1);
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    const payload = {
      ...formData,
      staffDetails: JSON.stringify(formData.staffDetails),
    };
    axios.post('http://localhost:4000/register-hospital', payload)
      .then(async (response) => {
        alert('Hospital registered successfully!',response.data);
        navigate('/login');
      })
      .catch((error) => {
        alert('Error registering hospital',error);
      });
  }

  return (
    <div className="form-container1">
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <form onSubmit={handleSubmit} className="formcontainer">
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
              Previous
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HospitalRegistrationForm;



