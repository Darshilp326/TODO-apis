const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/users');
const taskControllers=require('../controllers/task');
const authController=require('../controllers/authentication')


router.post('/signup',userControllers.signup);
router.post('/login',userControllers.login);
router.post('/task/:categoryId',authController.ensureAuthenticated,taskControllers.postTask);
router.post('/category',authController.ensureAuthenticated,taskControllers.postCategory)
router.get('/task/:categoryId',authController.ensureAuthenticated,taskControllers.getTask);
router.get('/tasks',authController.ensureAuthenticated,taskControllers.getAllTasks);
router.get('/category',authController.ensureAuthenticated,taskControllers.getCategories)
router.patch('/task/:id',authController.ensureAuthenticated,taskControllers.updateTask);
router.patch('/category/:id',authController.ensureAuthenticated,taskControllers.updateCategory);
router.delete('/task/:id',authController.ensureAuthenticated,taskControllers.deleteTask);
router.delete('/category/:id',authController.ensureAuthenticated,taskControllers.deleteCategory);

module.exports = router;