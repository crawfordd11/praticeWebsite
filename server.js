const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// Set EJS
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

// // Define schema + model
// const userContactSchema = new mongoose.Schema({
//   name: String,
//   email: String
// });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
  dateOfBirth: String
});

const User = mongoose.model("User", userSchema);

// Routes
// Read All
app.get('/', async (req, res) => {
  const users = await User.find();
  res.render('index', { users });
});

//Read One
app.get('/student/:_id', async (req, res) => {
  const user = await User.findById(req.params._id);

  if (!user) {
    return res.send("User not found");
  }

  res.render('student', { user });
});

//Create Student
app.post('/addStudent', async (req, res) => {
  console.log(req.body);
  const { name, email, password, gender, dateOfBirth } = req.body;

  const newUser = new User({
    name,
    email,
    password,
    gender,
    dateOfBirth
  });

  await newUser.save();

  res.redirect('/');
});

//Show Edit Form
app.get('/edit/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.send("User not found");

  res.render('edit', { user });
});

// Update Student
app.post('/update/:id', async (req, res) => {
  const { name, email, password, gender, dateOfBirth } = req.body;

  await User.findByIdAndUpdate(req.params.id, {
    name,
    email,
    password,
    gender,
    dateOfBirth
  });

  res.redirect('/');
});

//Delete Student
app.post('/delete/:_id', async (req, res) => {
  const id = req.params._id;

  await User.findByIdAndDelete(id);

  res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
