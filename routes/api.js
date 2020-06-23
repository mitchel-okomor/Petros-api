const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const userController = require('../controller/user');
const articleController = require('../controller/article');
const uplaod = require('../middleware/upload');



//create user
router.post('/user',  userController.createAccount);
//get user
router.get('/user/:id', auth, userController.account);
//get al;l users
router.get('/users', auth, userController.allAcounts);
//edit user account
router.patch('/user/:id', auth, userController.updateAcount);
//delete user
router.delete('/user/:id', auth, userController.deleteAccount);

//login user
router.post('/login', userController.login);

//get a particular news
router.get('/article/:id', articleController.article);
//get all news
router.get('/articles', articleController.allArticles);
//add a news
router.post('/article/:id', uplaod.single('image'), articleController.createArticle);
//edit a news
router.put('/article/:id', uplaod.single('image'), articleController.updateArticle);
//delete news
router.delete('/article/:id/:userId', articleController.deleteArticle);





module.exports = router;