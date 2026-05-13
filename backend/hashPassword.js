const bcrypt = require("bcryptjs");

bcrypt.hash("umaima123", 10).then((hash) => {
  console.log("Hashed Password:", hash);
});