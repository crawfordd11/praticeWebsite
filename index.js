const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydatabase");
    console.log("Connected to MongoDB");

    const userSchema = new mongoose.Schema({
      name: String,
      email: String
    });

    const User = mongoose.model("User", userSchema);
    const users = await User.find();
    console.log("Users:", users);
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
