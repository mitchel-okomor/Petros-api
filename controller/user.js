const db = require('../services/db');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
require('dotenv').config();



//create acount
exports.createAccount = async (req, res) => {
  bcrypt.hash (req.body.password, 10).then (hash => {
     let firstName = req.body.firstname;
     let lastName = req.body.lastname;
     let email = req.body.email;
     password = hash;

     let queryString = "SELECT * FROM users WHERE email = '" + email +"'";
db.query(queryString,   (err, result) => {
          if(result.length > 0){
                console.log("user exist");
               return res.status(400).json ({
                status: "error",
                message: 'email already exist!',
              });
               }
           else{
    let queryString = "INSERT INTO `users` (firstname, lastname, email, password) VALUES ('" + firstName + "', '" +lastName +"', '" +email +"', '" +password +"' )";
  db.query(queryString,   (err, result) => {
        if (err) {
            return err;
        }  
        return res.status(200).json ({
          status: "success",
          message: 'Account created successfully',
        });
    } 
    );
           }

  })

})
 
};


// login check and assign token
module.exports.login = (req, res) => {
  console.log(req.body);
  if(!req.body.password || !req.body.email){ 
    return  res.status(401).json ({
      status: "error",
      error: "Incorrect email or password",
    });
  }
  else{
  let email = req.body.email;
    let queryString = "SELECT * FROM `users` WHERE `email` = '" + email +"' ";
    db.query(queryString,   (err, result) => {
         if(result.length < 1){
              return res.status(400).json({
               status: "error",
               message: 'Incorrect email or password!',
             });
            }
            else{
              console.log(result);
             bcrypt
        .compare (req.body.password, result[0].password)
        .then (valid => {
          if (!req.body.password ||!valid) {
            return res.status(400).json (
              {
              status: "error",
              message: 'Incorrect email or password password!',
            });
          }
          const token = jwt.sign (
            {
              userId: result[0].id,
              isAdmin: result[0].role,
            },
            process.env.SECRET,
            {expiresIn: '24h'}
          );
          res.json ({
            status: 'success',
            message: 'Logged in successfully!',
            data: {
              user: result[0].id,
              token: token,
            },
          });
        })
        .catch (error => {
          console.log(error);
          res.status(501).json ({
            status: "error",
            message: "server error"
          });
        });  
            }
     
          }
     ) }
};


//profile info
exports.account = async (req, res) => {
  try {
    let queryString = "SELECT id, firstname, lastname, email, role FROM users WHERE id = '" + req.params.id +"'";
    db.query(queryString,   (err, result) => {
         if(result.length < 0){
              return res.status(400).json ({
               status: "error",
               message: 'no such user found',
             });
            }
            else{
              console.log(result);
              return res.status(200).json ({
                status: "success",
                data: result[0],
              });
            }
    });
  } catch (error) {
    console.log (error);
    return res.status(400).json ({
      status: "error",
      error: error
    });
  }
};


//All Accounts
exports.allAcounts = async (req, res) => {
  try {
    let queryString = "SELECT id, firstname, lastname, email, role FROM users";
    db.query(queryString,   (err, result) => {
         if(result.length < 0){
              return res.status(400).json ({
               status: "error",
               message: 'no users found',
             });
            }
            else{
              console.log(result);
              return res.status(200).json ({
                status: "success",
                data: result,
              });
            }
    });
  } catch (error) {
    console.log (error);
    return res.status(400).json ({
      status: "error",
      error: error
    });
  }
};



exports.deleteAccount = async (req, res) => {
  try {
    let queryString = "DELETE FROM users WHERE id = '" + req.params.id +"'";
    db.query(queryString,   (err, result) => {
         if(err){
              return res.status(400).json ({
               status: "error",
               message: 'failed to delete account',
             });
            }
            else{
              console.log(result);
              return res.status(200).json ({
                status: "success",
                message: "Account deleted succesfully",
              });
            }
    });
  } catch (error) {
    return res.status(400).json ({
      status: "error",
      error: error
    });
}
}

exports.updateAcount = async (req, res) => {
  try{
  await   bcrypt.hash (req.body.password, 10).then (hash => {
 let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let email = req.body.email;
    let  password = hash; 
  
  
   let queryString = "UPDATE `users` SET firstname ='" + firstName + "' , lastname ='" +lastName +"' , email =  '" +email +"', password ='" +password +"' WHERE id = '" +req.params.id+"' ";
 db.query(queryString,   (err, result) => {
       if (err) {
          console.log(err);
       }  
       return res.status(200).json ({
         status: "success",
         message: 'Account updated successfully',
       });
   } 
   );
    
  });
  }
  catch(err){
    return res.status(400).json ({
      status: "error",
      message: 'failed to update',
    });
  }
 
      
 }

