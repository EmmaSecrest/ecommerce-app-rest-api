const express = require("express");
const userAccountRegisterRouter = express.Router();
const validateEmail = require("./auth")
const { pool } = require("../config");
const bcrypt = require('bcrypt');





const addNewCart = (userId , done)=>{
    pool.query('INSERT INTO cart (user_id) VALUES ($1)',[userId] ,
    function(err, result){
        if(err){
            console.log(err);
            done(err,result)
        } else{
            done(null,result)
        }
    })
}


// logic for handling a new user registration
userAccountRegisterRouter.post('/' , (req,res) => {
    const {email,first_name,last_name,password } = req.body
    
    pool.query("SELECT * FROM users WHERE email = $1 ", [email],
    function(err, data){
        
        if (err){
            console.log(err)
        } else {
            if(data.rowCount > 0){
                return res.status(422).json({
                    error: { status: 422, data: "User with this email already exists."} 
                })
                
            } else if (validateEmail(email) === false){
                return res.status(422).json({
                    error: { status: 422, data: "Email address is not valid"}
                }) 
            } else {
                bcrypt.hash(password, 10, function(err, hash) {
                    pool.query('INSERT INTO users (email,first_name,last_name,password ) VALUES ($1, $2 , $3 , $4) RETURNING id' , [email, first_name , last_name, hash  ] ,
                    (err,data) => {
                        if (err){
                            throw err
                        }
                        //  console.log(data.rows[0].id)
                         addNewCart(data.rows[0].id , function(err,results){
                             if(err){
                                 console.log(err)
                                 res.send("There was a problem automating a cart")
                             } 
                         })
                        res.status(201).json({ status: 'success', message: 'Account added.' })
                    }  )
                    
                });
            }
        }
    })
    
})
 

 







module.exports = userAccountRegisterRouter;