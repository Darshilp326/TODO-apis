const Task = require("../models/Task");


// Post a Task after making category
// /task(POST REQUEST)
exports.postTask = (req, res) => {
  {   
    const newTask = new Task({
      created_by:req.user.id,
      category:req.body.category,
      name: req.body.name,
      deadline: req.body.deadline,
    });
    newTask
      .save()
      .then((task) => {
        res.json(task);
      })
      .catch((err) => {
        res.send(err);
      });
  }
};
//Get a particular task by its id
// /task/:id
exports.getTask=(req,res)=>{
  const id=req.params.id
  Task.findOne({_id:id})
  .then(task=>{
    res.send(task)
  })
  .catch(err=>{
    res.status(500).json({err})
  })
}

//Update a single task by giving its id
// /task/:taskId (PUT REQUEST)
exports.updateTask = (req, res) => {
  const currUser = req.user.id;
  console.log(currUser);
  Task.findOne({ _id: req.params.id })
    .then((task) => {
      data=task
      console.log(task);
      task.name=req.body.name;
      task.deadline=req.body.deadline
    

      return task.save(); // saves document with subdocuments and triggers validation
    })
    .then((doc) => {
      res.send({ doc });
    })
    .catch((e) => res.status(400).send(e));
};


//Get all tasks of user irrespective of categories
// /tasks (GET REQUEST)
exports.getAllTasks = async (req, res, next) => {
  id = req.user.id;
  console.log(id);
  const tasks = await Task.find(
    { created_by: id },
    { name: 1, deadline: 1, created_on: 1 }
  );
  res.send({ data: tasks });
};



// Delete a task by giving its task id
// /task/:taskId (DELETE REQUEST)
exports.deleteTask = (req, res, next) => {
  Task.findByIdAndRemove({ _id: req.params.id })
    .then((task) => {
      res.send(task);
    })
    .catch(next);
};

