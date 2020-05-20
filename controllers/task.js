const Task=require('../models/Task');
const Category=require('../models/Category');


// Post a Task after making category
// /task/:categoryId(POST REQUEST)
exports.postTask=(req,res)=>{
    {
      user=req.user.id;
      category=req.params.categoryId;
       const date=Date.now(req.body.createdOn)
       const newtask=new Task({
        user,
        category,
        body:req.body.body,
        createdOn:date,
        deadline:req.body.deadline
      })
      newtask.save()
      .then(task=>{
        res.json(task)
      })
      .catch(err=>{
        res.send(err)
      })        
}
}


// Get All Tasks of specific category
// /task/:categoryId(GET REQUEST)
exports.getTask=async(req,res,next)=>
    {
    id = req.user.id
    console.log(id);
    const tasks=await Task.find({"user":id,"category":req.params.categoryId},{body:1,deadline:1}).populate("category","name")
     res.send({data:tasks})    
    }    


//Update a single task by giving its id
// /task/:taskId (PATCH REQUEST)
exports.updateTask=(req,res)=>{
        const currUser = req.user.id;
        console.log(currUser)
        Task.findOne({_id:req.params.id})
        .then((task) => {
            console.log(task)
           task.set(req.body)
          return task.save(); // saves document with subdocuments and triggers validation
        })
        .then((doc) => {
          res.send({ doc });
        })
        .catch(e => res.status(400).send(e))
}


// Make a new Category
// /category (POST REQUEST)
exports.postCategory=(req,res)=>{
 const {name,createdOn}=req.body
 const newcategory=new Category({
   user:req.user.id,
   name,
   createdOn
 })
 newcategory.save()
 .then(category=>{
   res.status(200).json(category)
 })
 .catch(err=>{
   res.status(500).json(err)
 }) 
}


//Get all tasks of user irrespective of categories
// /tasks (GET REQUEST)
exports.getAllTasks=async(req,res,next)=>{
  id = req.user.id
  console.log(id);
  const tasks=await Task.find({"user":id},{body:1,deadline:1,createdOn:1})
   res.send({data:tasks})    
  }
  
  
//Get all categories of a user
// /category(GET REQUEST)
exports.getCategories=async(req,res)=>{
  id = req.user.id
  console.log(id);
  const categories=await Category.find({"user":id})
   res.send({data:categories})
}


//Update a category by giving its id
// /category/:categoryId(PATCH REQUEST)
exports.updateCategory=(req,res)=>{
  const currUser = req.user.id;
  console.log(currUser)
  Category.findOne({_id:req.params.id})
  .then((category) => {
      console.log(category)
     category.set(req.body)
    return category.save(); 
  })
  .then((doc) => {
    res.send({ doc });
  })
  .catch(e => res.status(400).send(e))
}


// Delete a task by giving its task id
// /task/:taskId (DELETE REQUEST)
exports.deleteTask=(req,res,next)=>{
  Task.findByIdAndRemove({_id: req.params.id}).then(task=>{
    res.send(task);
}).catch(next);
}


//Delete a category by giving its id
// /category/:categoryId(DELETE REQUEST)
exports.deleteCategory=(req,res,next)=>{
  Category.findByIdAndRemove({_id: req.params.id}).then(category=>{
    res.send(category);
}).catch(next);
}


