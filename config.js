//The following environment variables can be used to select default connection parameter values, which will be used by PQconnectdb, PQsetdbLogin and PQsetdb if no value is directly specified by the calling code. These are useful to avoid hard-coding database connection information into simple client applications, for example. 
// https://www.postgresql.org/docs/9.3/libpq-envars.html

//attempting to connect to the server
require('dotenv').config();
const {Pool} = require('pg')
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false
        }
  })



pool.on("connect", () => {
    console.log("database connected") // not sure what these are suppose to do
});

pool.on("end", () => {
    console.log("connection ended")
});

  
//  console.log(process.env.PGUSER) 
// this printed out the username for the database


module.exports = {
    PORT: process.env.port,
    DB: {
        PGHOST: process.env.PGHOST, //PGHOST behaves the same as the host connection parameter.
        PGUSER: process.env.PGUSER, //PGUSER behaves the same as the user connection parameter.
        PGDATABASE: process.env.PGDATABASE, //behaves the same as the dbname connection parameter
        PGPASSWORD: process.env.PGPASSWORD, //behaves the same as the password connection parameter
        PGPORT: process.env.PGPORT //behaves the same as the port connection parameter
    },
    SESSION_SECRET: process.env.SESSION_SECRET, //needed for express-session,
    pool
} 

