
const db = require('../services/db');

class User{

constructor(firstName, lastName, email, password){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
}

set user(val){
(this.firstName, this.lastName, this.email, this.password)
}

get user(){
    return([this.firstName, this.lastName, this.email, this.password]);
}

 async createAccount(){
try{
    let queryString = "SELECT * FROM `users` WHERE email = '" + this.email +"'";
 const queryResult= db.query(queryString,   (err, result) => {
        if (err) {
            return err
        }   
       else if(result.length > 0){
            console.log("user exist");
           return result="email exist";
          
           }
       
       else{
let queryString = "INSERT INTO `users` (firstname, lastname, email, password) VALUES ('" + this.firstName + "', '" +this.lastName +"', '" +this.email +"', '" +this.password +"' )";
queryResult = db.query(queryString,   (err, result) => {
    if (err) {
        return err;
    }  
    else{console.log(result);
   return result;
} 

});
       }

return queryResult;       
    });
}
catch(err){
console.log(err);
}

    
 }
login(val){
    try{
    let queryString = `SELECT * FROM users WHERE email=$1`;
    db.query(queryString,   (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
       return result;
    })
}
   catch(err){
console.log("Can not query database");
   }

}

profile(id){

    try{
  let queryString = `SELECT * FROM users WHERE id=${id}`;
 return  db.query(queryString);
    } catch(error){
        console.log(error);
    }
  
    
}

async editProfile(id){
    try{
    let  queryString = `UPDATE users SET firstname =$1, lastname=$2, email=$3, password=$4, gender=$5, jobrole=$6, department=$7, address=$8, dateofbirth=$9, date_updated=$10, is_admin=$11 WHERE ID=${id} returning *`;
    return   db.query(queryString, this.user);
    } catch(error){
        console.log(error);
    }

}

deleteAccount(id){
    try{
 let queryString = `DELETE FROM users WHERE id=${id}`;
    return  db.query(queryString, this.user);
    } catch(error){
        console.log(error);
    }
   
}

allAcounts(){
    try{
let queryString = `SELECT * FROM users`;
    return   db.query(queryString);
    } catch(error){
        console.log(error);
    }
    
       
}

saveImgageUrl(id, imgUrl){
    try{
        let  queryString = `UPDATE users SET img_url =$1 WHERE ID=${id} returning *`;
        return   db.query(queryString, [imgUrl]);
        } catch(error){
            console.log(error);
        }
}

}

module.exports = User;

