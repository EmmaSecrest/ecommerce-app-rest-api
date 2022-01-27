//offers services for authenticating the user

// Check if user already exists
// If user already exists, reject for registration
// creates a new user if not
// match passwords for login

const { pool } = require("../config");

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const UserByEmailExists = (email) => {
  pool.query(
    "SELECT * FROM users WHERE email = ? ",
    [email],
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        if (data) {
          console.log("user already exists. Returning true");
          return true;
        } else {
          return false;
        }
      }
    }
  );
};

module.exports = { UserByEmailExists, validateEmail };