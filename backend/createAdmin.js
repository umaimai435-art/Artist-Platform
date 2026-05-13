const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./src/models/admin");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("umaimaiqbal", 10);

    const admin = await Admin.create({
      name: "Admin",
      email: "umaimai435@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created:", admin);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

createAdmin();