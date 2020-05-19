const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/users');
const taskControllers=require('../controllers/task');
const authController=require('../controllers/authentication')


router.post('/signup',userControllers.signup);
router.post('/login',userControllers.login);
router.post('/task',authController.ensureAuthenticated,taskControllers.postTask);
router.get('/task',authController.ensureAuthenticated,taskControllers.getTask);
router.patch('/task/:id',authController.ensureAuthenticated,taskControllers.updateTask);

module.exports = router;