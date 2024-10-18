const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const Patient = require('./models/Patient');

const Hospital = require('./models/Hospital');
const Staff = require('./models/Staff');
const bcrypt = require('bcrypt');

// Check UserModel import
const UserModel = require('./models/User');
const Appointment = require('./models/Appointments');

const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/users")
const jwt = require('jsonwebtoken');
const secretKey = 'Hey this is karthik'; 
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ username: email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '1h' });

        res.json({ token, role: user.role, userId: user._id }); // Include userId in the response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

  
  // Create the Appointment model
  
  // Create the POST /appointments endpoint

  app.get('/appointments', async (req, res) => {
    try {
      const { docId, date } = req.query;
  
      if (!docId || !date) {
        return res.status(400).json({ message: 'docId and date are required.' });
      }
  
      // Convert docId to ObjectId
      const objectId =new mongoose.Types.ObjectId(docId);
  
      // Query appointments with the converted ObjectId
      const appointments = await Appointment.find({ docId: objectId, scheduleDate: date });
  
      const scheduleTimes = appointments.map(appt => appt.scheduleTime);
      
      res.json({ scheduleTime: scheduleTimes });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  app.post('/appointments', async (req, res) => {
    try {
      const { userId, docId, hospitalId, scheduleDate, scheduleTime, treated } = req.body;
  
      // Create a new appointment
      const newAppointment = new Appointment({
        userId,
        docId,
        hospitalId,
        scheduleDate,
        scheduleTime,
        treated,
      });
  
      // Save the appointment to the database
      await newAppointment.save();
  
      res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (err) {
      console.error('Error creating appointment:', err);
      res.status(500).json({ error: 'An error occurred while creating the appointment' });
    }
  });

app.post('/register-user', async (req, res) => {
    const { fullName, email, password, phoneNumber, age, weight, gender, dateOfBirth, address } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ username: email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in UserModel
        const newPatUser = new UserModel({
            username: email, // Email
            password: hashedPassword,
            role: 'user'
        });
        await newPatUser.save();

        // Create a new patient record
        const newUser = new Patient({
            UserId: newPatUser._id,
            username: email, // Using email as the username
            password: hashedPassword,
            fullName,
            phoneNumber,
            age,
            weight,
            gender,
            dateOfBirth,
            address
        });

        // Save the patient to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/get-hospital-by-user/:userId', async (req, res) => {
    try {
      const hospital = await Hospital.findOne({ hospitalId: req.params.userId });
      if (!hospital) {
        return res.status(404).json({ message: 'Hospital not found' });
      }
      res.status(200).json({ hospital });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  



app.post('/register-hospital', async (req, res) => {
    const hospitalData = req.body;

    try {
        // Hash the hospital's password
        const hospitalPassword = await bcrypt.hash(hospitalData.password, 10);
        const newHospitalUser = new UserModel({
            username: hospitalData.email,
            password: hospitalPassword,
            role: 'hospital'
        });
        await newHospitalUser.save();

        const newHospital = new Hospital({
            hospitalId: newHospitalUser._id,
            names: hospitalData.hospitalName,
            address: hospitalData.address,
            city: hospitalData.city,
            state: hospitalData.state,
            pincode: hospitalData.pincode,
            contactNumber: hospitalData.contactNumber,
            email: hospitalData.email,
            openingTime: hospitalData.openingTime,
            closingTime: hospitalData.closingTime,
            servicesOffered: hospitalData.servicesOffered,
            numberOfBeds: hospitalData.numberOfBeds,
            departments: hospitalData.departments,
            website: hospitalData.website,
            hospitalDescription: hospitalData.hospitalDescription,
            latitude: hospitalData.latitude,
            longitude: hospitalData.longitude,
        });

        const savedHospital = await newHospital.save();

        // Parse staff details from JSON if necessary
        const staffDetails = typeof hospitalData.staffDetails === 'string'
            ? JSON.parse(hospitalData.staffDetails)
            : hospitalData.staffDetails;
        console.log(staffDetails);
        // Handle saving of staff details with async operations
        const staffPromises = staffDetails.map(async (staff) => {
            const staffPassword = await bcrypt.hash(String(staff['4']), 10); // Assuming index 4 is password
            const newDocUser = new UserModel({
                username: staff['5'], // Assuming index 5 is email
                password: staffPassword,
                role: 'doctor',
            });
            const savedDoc = await newDocUser.save();

            const newStaff = new Staff({
                hospitalId: savedHospital._id,
                DocId: savedDoc._id,
                names: staff['0'],
                gender: staff['1'],
                specialization: staff['2'],
                experience: staff['3'],
                contactNumber: String(staff['4']),
                email: staff['5'],
                consultationHours: staff['6'],
                department: staff['7'],
                servicesProvided: staff['8'],
                imageUrl: staff.image // Ensure this is set correctly
            });

            return newStaff.save(); // Return promise for concurrent handling
        });

        // Wait for all staff details to be saved
        await Promise.all(staffPromises);

        res.status(200).json({ message: 'Hospital and staff registered successfully!',hospitalId: savedHospital._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/hospitals', async (req, res) => {
    try {
        const hospitals = await Hospital.find({});
        res.status(200).json(hospitals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/hospital/:id', async (req, res) => {
    
    try {
       
        // Fetch the hospital details using the hospital ID
        const hospital = await Hospital.findById(req.params.id);

        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        // Fetch the doctors associated with this hospital
        const doctors = await Staff.find({ hospitalId: hospital._id });

        // Return the hospital details along with the associated doctors
        res.json({ hospital, doctors });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(4000, () => {
    console.log("server is running")
})