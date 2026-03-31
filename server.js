const express = require('express');
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));

const app = express();
const port = 3000;

// Set EJS
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

// Define schema + model
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", userSchema);

// Routes
app.get('/', async (req, res) => {
  const users = await User.find();
  res.render('index', { 
    title: 'Welcome to EJS Lab',
    message: 'Hello, Students!',
    users: users
  });
});

app.get('/student/:name', (req, res) => {
  res.render('student', { studentName: req.params.name });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});