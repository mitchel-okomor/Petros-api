const { v4: uuidv4 } = require('uuid');
const db = require('../services/db');


//create an article
exports.createArticle = async (req, res) => {
    const id = uuidv4();
    const userId = req.params.id;
      const title = req.body.title;
     const body = req.body.article;
     const dateString = new Date();
    let queryString = "INSERT INTO `articles` (id, user_id, title, body, date_created) VALUES ('" + id + "', '" +userId +"', '" +title +"', '" +body +"', '"+dateString+"')";
    db.query(queryString,   (err, result) => {
          if (err) {
             console.log(err);
             return res.status(501).json ({
              status: "error",
              message: 'server error',
            });
          }else{
return res.status(200).json ({
            status: "success",
            message: 'Article created successfully',
          });
          }  
          
      } 
      );
             }


//view one article
exports.article = async (req, res) => {
  try {
    let queryString = "SELECT * FROM articles WHERE id = '" + req.params.id +"'";
    await db.query(queryString,   (err, result) => {
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
                data: result
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


//view all articles
exports.allArticles = async (req, res) => {
  try {
    let queryString = "SELECT * FROM articles";
    await db.query(queryString,   (err, result) => {
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
                data: result
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


//delete an article
exports.deleteArticle = async (req, res) => {
  try {
    let queryString = "DELETE FROM articles WHERE id = '" + req.params.id +"'";
   await db.query(queryString,   (err, result) => {
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
                message: "Article deleted succesfully",
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

//update an articel
exports.updateArticle = async (req, res) => {

  const id = uuidv4();
  const userId = req.params.userId;
    const title = req.body.title;
   const body = req.body.body;
   const dateString = new Date();

   try{
     let queryString = "UPDATE `articles` SET title ='" + title + "' , body ='" + body +"' , date_updated =  '" +dateString +"' WHERE id = '" +req.params.id+"' ";
   db.query(queryString,   (err, result) => {
         if (err) {
            console.log(err);
         }  
         return res.status(200).json ({
           status: "success",
           message: 'Article updated successfully',
         });
     } 
     );
      
 
    }
    catch(err){
      return res.status(400).json ({
        status: "error",
        message: 'failed to update',
      });
    }
};
