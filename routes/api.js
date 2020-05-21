const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/users');
const taskControllers=require('../controllers/task');
const authController=require('../controllers/authentication')
const categoryControllers=require('../controllers/categories')

//Users Signup
router.post('/signup',userControllers.signup);

//Users login
router.post('/login',userControllers.login);

// Post a task 
router.post('/tasks',authController.ensureAuthenticated,taskControllers.postTask);

//Make a new category
router.post('/categories',authController.ensureAuthenticated,categoryControllers.postCategory)

//Get  tasks by particular id
router.get('/task/:id',authController.ensureAuthenticated,taskControllers.getTask);

//Get all tasks irrespective of an category
router.get('/tasks',authController.ensureAuthenticated,taskControllers.getAllTasks);

//Get all catgeories
router.get('/categories',authController.ensureAuthenticated,categoryControllers.getCategories)

//Update a task
router.put('/task/:id',authController.ensureAuthenticated,taskControllers.updateTask);

//Update a category
router.put('/category/:id',authController.ensureAuthenticated,categoryControllers.updateCategory);


//Delete a task
router.delete('/tasks/:id',authController.ensureAuthenticated,taskControllers.deleteTask);

//Delete a category
router.delete('/category/:id',authController.ensureAuthenticated,categoryControllers.deleteCategory);

//Get category by a particular id
router.get('/category/:id',authController.ensureAuthenticated,categoryControllers.getCategoryById)


//Get all tasks of a particular id
router.get('/category/:categoryId/tasks',authController.ensureAuthenticated,categoryControllers.getTasksOfSpecificCategory)


module.exports = router;