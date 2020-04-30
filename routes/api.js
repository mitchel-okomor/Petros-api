const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userController = require('../controller/user');
const articleController = require('../controller/article');

router.get("/", (req, res)=>{
res.status(200).send({   message: "welcome to the response to nothingness"}
)
});

//create user
router.post('/user', (req,res, next)=>{console.log("request recieved"); next();}, userController.createAccount);
//get user
router.get('/user/:id', userController.account);
//get al;l users
router.get('/users', userController.allAcounts);
//edit user account
router.patch('/user/:id', userController.updateAcount);
//delete user
router.delete('/user/:id', userController.deleteAccount);
//login user
router.post('/login', userController.login);

//get a particular news
router.get('/article/:id', articleController.article);
//get all news
router.get('/articles', articleController.allArticles);
//add a news
router.post('/article/:id', articleController.createArticle);
//edit a news
router.patch('/article/:id', articleController.updateArticle);
//delete news
router.delete('/article/:id', articleController.deleteArticle);





module.exports = router;