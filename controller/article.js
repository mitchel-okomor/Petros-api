const { v4: uuidv4 } = require('uuid');
const db = require('../services/db');


//create an article
exports.createArticle =  (req, res) => {

    const id = uuidv4().replace("'", "\\'");
    const userId = req.params.id.replace("'", "\\'");
      const title = req.body.title.replace("'", "\\'");
      const description = req.body.description.replace("'", "\\'");
      const imageUrl = req.file.filename.replace("'", "\\'");
     const dateString = req.body.date.replace("'", "\\'");

    let queryString = "INSERT INTO `articles` (id, user_id, title, description, date_created, image_url) VALUES ('" + id + "', '" +userId +"', '" +title +"', '" +description +"', '"+dateString+"','" +imageUrl +"')";
  console.log(queryString);
 db.query(queryString,   (err, result) => {
          if (err) {
             console.log(err);
             return res.status(501).json ({
              status: "error",
              message: 'server error',
            });
          }else{
            console.log(result);
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
    let queryString = "SELECT * FROM articles ORDER BY date DESC LIMIT 10";
    await db.query(queryString,   (err, result) => {
         if(result.length < 0){
              return res.status(400).json ({
               status: "error",
               message: 'no such user found',
             });
            }
            else{
              return res.status(200).json ({
                status: "success",
                data: result
              });
            }
    });
  } catch (error) {
    return res.status(400).json ({
      status: "error",
      error: error
    });
  }
};


//delete an article
exports.deleteArticle = async (req, res) => {
  console.log(req.params.id + "" + req.params.userId);
  try {
    let queryString = "DELETE FROM articles WHERE id = '" + req.params.id +"' AND  '" + req.params.userId +"'";
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

    const title = req.body.title.replace("'", "\\'");
   const description = req.body.description.replace("'", "\\'");
   const dateString = new Date().now;

   try{
     let queryString = "UPDATE `articles` SET title ='" + title + "' ,  description = '" +description +"',  date_updated =  '" +dateString +"' WHERE id = '" +req.params.id+"' ";
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
