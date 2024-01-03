const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(cors());

// Connection to MongoDB 
mongoose.connect('mongodb://localhost:27017/mean-stack-onlinevaccine', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//-------------------------------------------------------------------------------------

//user Schema and model
const userSchema = mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  securityQuestion1: String,
  securityAnswer1: String,
  securityQuestion2: String,
  securityAnswer2: String,
});

const User = mongoose.model('User', userSchema);

// UserProfile schema
const userProfileSchema = mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  dob: { type: String, default: 'Not Provided' },
  phoneNumber: { type: String, default: 'Not Provided' },
  address: { type: String, default: 'Not Provided' },
  gender: { type: String, default: 'Not Provided' },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

app.use(bodyParser.json());

// User registration endpoint
app.post('/register', async (req, res) => {
  const {
    username,
    email,
    password,
    securityQuestion1,
    securityAnswer1,
    securityQuestion2,
    securityAnswer2,
    dob,
    phoneNumber,
    address,
    gender,
  } = req.body;

  // Basic validation
  if (!username || !email || !password || !securityQuestion1 || !securityAnswer1 || !securityQuestion2 || !securityAnswer2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newUser = new User({
      username,
      email,
      password,
      securityQuestion1,
      securityAnswer1,
      securityQuestion2,
      securityAnswer2,
    });

    const savedUser = await newUser.save();

    // Save data in UserProfile schema
    const newUserProfile = new UserProfile({
      username,
      email,
      dob: dob || 'Not Provided',
      phoneNumber: phoneNumber || 'Not Provided',
      address: address || 'Not Provided',
      gender: gender || 'Not Provided',
    });

    const savedUserProfile = await newUserProfile.save();

    res.status(201).json({ user: savedUser, userProfile: savedUserProfile });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({ error: 'Email address is already registered' });
    }

    console.error(err);
    res.status(500).json({ error: 'Error saving user' });
  }
});


// API endpoint for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Using await to wait for the promise to resolve
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error finding user' });
  }
});

//-------------------------------------------------------------------------------
//forgot password
// route to handle security answers check
app.post("/reset-password-check-answers", async (req, res) => {
  try {
    const { email, securityAnswer1, securityAnswer2 } = req.body;

    // Fetches user based on email and checks security answers
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

   // Checks security answers
    if (
      user.securityAnswer1 !== securityAnswer1 ||
      user.securityAnswer2 !== securityAnswer2
    ) {
      return res.status(401).send({ message: "Incorrect security answers" });
    }

   // If security answers are correct, respond with success
    res.status(200).send({ message: "Security answers are correct" });
  } catch (error) {
    console.error("Error during security answers check:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//to reset password
app.post("/reset-password", async (req, res) => {
  try {
    const { email, securityAnswer1, securityAnswer2, newPassword, confirmPassword } = req.body;

    // Fetch user based on email and check security answers
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // Check security answers
    if (
      user.securityAnswer1 !== securityAnswer1 ||
      user.securityAnswer2 !== securityAnswer2
    ) {
      return res.status(401).send({ message: "Security answers are incorrect" });
    }

    // Validate and update the new password
    if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/forgot-password-check-email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      const { securityQuestion1, securityQuestion2 } = user;
      res.json({ securityQuestions: { securityQuestion1, securityQuestion2 } });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//----------------------------------------------------------------------------

//Booking user Slot schema and mode
const slotSchema = new mongoose.Schema({
  userEmail: String,
  vaccineName: String,
  name: String,
  age: String,
  date: String,
  time: String,

});

const Slot = new mongoose.model("Slot", slotSchema);

app.post("/book-slot", async (req, res) => {
  try {
    const {
      userEmail,
      vaccineName,
      name, 
      age,
      date,
      time

    } = req.body;


    const existingSlot = await Slot.findOne({ userEmail });

    if (existingSlot) {
      return res.status(400).send({ message: "User has already booked a slot" });

    }

    const newSlot = new Slot({
      userEmail,
      vaccineName,
      name,
      age,
      date,
      time,

    });

    await newSlot.save();

    res.status(201).send({ message: "Slot booked successfully" });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/booked-slot/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail;

    // Finding all booked slots for the specified userEmail
    const bookedSlots = await Slot.find({ userEmail });

    if (!bookedSlots || bookedSlots.length === 0) {
      return res.status(404).send({ message: "No booked slots found for the specified email" });
    }

    res.status(200).json(bookedSlots);
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.delete("/booked-slot/:id", async (req, res) => {
  try {
    const slotId = req.params.id;

    // Finding and removing the booked slot with the specified ID
    const deletedSlot = await Slot.findByIdAndDelete(slotId);

    if (!deletedSlot) {
      return res.status(404).send({ message: "Booked slot not found" });
    }

    res.status(200).json({ message: "Booked slot deleted successfully" });
  } catch (error) {
    console.error("Error deleting booked slot:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/booked-slot/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;

    const slot = await Slot.findById(id);

    if (!slot) {
      return res.status(404).send({ message: "Slot not found" });
    }
    slot.date = date;
    slot.time = time;

    await slot.save();

    res.status(200).send({ message: "Slot rescheduled successfully" });
  } catch (error) {
    console.error("Error rescheduling slot:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//----------------------------------------------------------------


// adminside Addingvaccine schema and model
const vaccineSchema = new mongoose.Schema({
  name: String,
  startDate: String,
  endDate: String,
  placeOfVaccination: String,
});

const Vaccine = mongoose.model('Vaccine', vaccineSchema);

app.post('/addvaccine', async (req, res) => {
  try {
    const { name, startDate, endDate, placeOfVaccination } = req.body;

    const existingVaccine = await Vaccine.findOne({ name });

    if (existingVaccine) {
      return res.status(400).send({ message: 'Vaccine already exists' });
    }

    const newVaccine = new Vaccine({ name, startDate, endDate, placeOfVaccination });
    await newVaccine.save();

    res.status(201).send({ message: 'Vaccine added successfully' });
  } catch (error) {
    console.error('Error adding vaccine:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/vaccine-posted', async (req, res) => {
  try {
    const vaccines = await Vaccine.find({}, 'name startDate endDate placeOfVaccination');

    res.status(200).json(vaccines);
  } catch (error) {
    console.error('Error fetching vaccines:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


app.delete('/delete-vaccine/:vaccineId', async (req, res) => {
  try {
    const { vaccineId } = req.params;

    await Vaccine.findByIdAndDelete(vaccineId);

    res.status(200).send({ message: 'Vaccine deleted successfully' });
  } catch (error) {
    console.error('Error deleting vaccine:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

//--------------------------------------------------------------


//Familyslot booking schema and model
const familySlotSchema = new mongoose.Schema({
  userEmail: String,
  id: Number,
  name: String,
  age: Number,
  vaccine: String,
  date: String,
  time: String
});

const FamilySlot = mongoose.model('FamilySlot', familySlotSchema);

app.post('/family-members', async (req, res) => {
  const familyMembers = req.body;

  try {
    // Include user's email in each family member object
    familyMembers.forEach(member => {
      member.userEmail = member.userEmail || ''; // Ensure userEmail is set (for cases where it might be missing)
    });

    // Save each family member to the database
    const savedFamilyMembers = await FamilySlot.insertMany(familyMembers);
    console.log('Booked slots:', savedFamilyMembers);
    res.status(200).send('Slots booked successfully');
  } catch (error) {
    console.error('Failed to book slots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/familybookedslot', async (req, res) => {
  try {
    const userEmail = req.headers['user-email'] || '';
    const bookedSlots = await FamilySlot.find({ userEmail }); // No need to specify fields here, it will return all fields
    

    res.status(200).json(bookedSlots);
  } catch (error) {
    console.error('Failed to fetch booked slots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Updating family booked slot by ID
app.put('/familybookedslot/:id', async (req, res) => {
  const slotId = req.params.id;
  const updatedSlotData = req.body;

  try {
    const updatedSlot = await FamilySlot.findOneAndUpdate({ id: slotId }, updatedSlotData, {
      new: true,
    });

    if (updatedSlot) {

      res.status(200).json(updatedSlot);
    } else {
      res.status(404).json({ error: 'Family booked slot not found' });
    }
  } catch (error) {
    console.error('Failed to update family booked slot:', error);
   
  }
});
app.delete('/familybookedslot/:id', async (req, res) => {
  const slotId = req.params.id;

  try {
    const deletedSlot = await FamilySlot.findOneAndDelete({ id: slotId });
    
    

    if (deletedSlot) {

      res.status(204).send('Family Slot Deleted Successfully'); 
    } else {
      res.status(404).json({ error: 'Family booked slot not found' });
    }
  } catch (error) {
    console.error('Failed to delete family booked slot:', error);
    res.status(500).send('Internal Server Error');
  }
});

//------------------------------------------------------------------------

//admindashboard
//getting user booked slot

app.get('/book-slot', async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//getting family booked slot

app.get('/family-members', async (req, res) => {
  try {
    const familyMembers = await FamilySlot.find();
    res.json(familyMembers);
  } catch (error) {
    console.error('Error fetching family slots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// reschedule the user booked slot

app.put('/reschedule-slot/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { newDate, newTime } = req.body;

    // Update the slot with the new date and time
    await Slot.findByIdAndUpdate(id, { date: newDate, time: newTime });

    res.status(200).json({ message: 'Slot rescheduled successfully' });
  } catch (error) {
    console.error('Error rescheduling slot:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//delete the user booked slot

app.delete('/delete-slot/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Deleting the slot by ID
    await Slot.findByIdAndDelete(id);

    res.status(200).json({ message: 'Slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting slot:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//reschedule the family booked slot by id

app.put('/reschedule-family-slot/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { newDate, newTime } = req.body;

    // Updating the family slot with the new date and time
    await FamilySlot.findByIdAndUpdate(id, { date: newDate, time: newTime });

    res.status(200).json({ message: 'Family slot rescheduled successfully' });
  } catch (error) {
    console.error('Error rescheduling family slot:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//deleting family booked slot by id

app.delete('/delete-family-slot/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Deleting the family slot by ID
    await FamilySlot.findByIdAndDelete(id);

    res.status(200).json({ message: 'Family slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting family slot:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//----------------------------------------------------------------

//admin dashboard  for complete button

// VaccineSlot Schema and Model
const vaccinatedSchema = new mongoose.Schema({
  userEmail: String,
  name: String,
  id: Number,
  vaccineName: String,
  age: Number,
  date: String,
  time: String,
});

const Vaccinated = mongoose.model('Vaccinated', vaccinatedSchema);
//completed status for user 
app.post('/completeSlot/:slotId', async (req, res) => {
  const slotId = req.params.slotId;

  try {
    // Retrieving the slot by ID from the "slots" collection
    const slot = await Slot.findById(slotId);

    // Storing the completed slot data in the "vaccinated" collection
    const vaccinated = new Vaccinated({
      userEmail: slot.userEmail,
      name: slot.name,
      vaccineName: slot.vaccineName,
      age: slot.age,
      date: slot.date,
      time: slot.time,
    });

    await vaccinated.save();

    // Optionally, we can remove the slot from the "slots" collection
    await Slot.findByIdAndDelete(slotId);

    res.status(200).json({ message: 'Regular slot completed successfully' });
  } catch (error) {
    console.error('Error completing regular slot:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to complete a family slot by id
app.post('/completeFamilySlot/:familySlotId', async (req, res) => {
  const familySlotId = req.params.familySlotId;

  try {
    // Retrieving the family slot by ID from the "familySlots" collection
    const familySlot = await FamilySlot.findById(familySlotId);

    // Storing the completed family slot data in the "vaccinated" collection
    const vaccinated = new Vaccinated({
      userEmail: familySlot.userEmail,
      id: familySlot.id,
      name: familySlot.name,
      vaccineName: familySlot.vaccine,
      age: familySlot.age,
      date: familySlot.date,
      time: familySlot.time,
    });

    await vaccinated.save();

    // Optionally, we can remove the family slot from the "familySlots" collection
    await FamilySlot.findByIdAndDelete(familySlotId);

    res.status(200).json({ message: 'Family slot completed successfully' });
  } catch (error) {
    console.error('Error completing family slot:', error);
    res.status(500).send('Internal Server Error');
  }
});
//----------------------------------------------------------------

//user vaccination history for userpage
app.get('/getUserVaccinationHistory/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail;

  try {
    const userVaccinationHistory = await Vaccinated.find({ userEmail });
    res.json(userVaccinationHistory);
  } catch (error) {
    console.error('Error fetching user vaccination history:', error);
    res.status(500).send('Internal Server Error');
  }
});
//---------------------------------------------------------------


//user vaccinehistory for admin page 
app.get('/vaccinatedDetails', async (req, res) => {
  try {
    // Fetch all vaccinated details from the "Vaccinated" collection
    const vaccinatedDetails = await Vaccinated.find({});
    res.json(vaccinatedDetails);
  } catch (error) {
    console.error('Error fetching vaccinated details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//----------------------------------------------------------------------



//userprofile
app.put('/user/profile/update', async (req, res) => {
  try {
    const { email } = req.query; 

    // Check if the email is provided
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }

    // Update the user profile based on the email
    const updatedUserProfile = await UserProfile.findOneAndUpdate(
      { email },
      { $set: req.body },
      { new: true } // Return the updated document
    );

    if (!updatedUserProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json(updatedUserProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/user/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Fetch user profile based on email
    const userProfile = await UserProfile.findOne({ email });

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});