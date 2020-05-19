const Task=require('../models/Task');

// Post a Single Task
exports.postTask=(req,res)=>{
    {
        const date=new Date(req.body.tasks[0].createdOn)
        const id = req.user.id;
        console.log(id);
        var task=
        {
            name:req.body.tasks[0].name,
            createdOn :date, 
           deadline: req.body.tasks[0].deadline
        };
        Task.findOne({user:id}).then(todo =>{
          console.log(todo)
          if(todo){
            todo.tasks.push(task);
            todo.save()
            .then(todo=>res.send(todo))
          }
          if(!todo){
            const newUser = new Task({
              user:id,
              tasks: task        
            }); 
            newUser
                .save()
                .then(task => {
                    console.log(newUser)
                  res.send(task)
                })
                .catch(err => {console.log(err)
                res.status(500).json({error:err})
                }); 
          }  
  }) 
}
}

// Get All Tasks

exports.getTask=(req,res,next)=>{
    id = req.user.id
    console.log(id);
    Task.findOne({user:id}).then(user =>{
        if(user)
        res.send(user.tasks)
        else{
          res.send({mssg:"No tasks exists."})
        }
    }).catch(next)
}
//Update a single task by giving its id
exports.updateTask=(req,res)=>{
        const currUser = req.user.id;
        console.log(currUser)
        Task.findOne({user:currUser})
        .then((user) => {
            console.log(user)
          const tasks = user.tasks.id(req.params.id); // returns a matching subdocument
          tasks.set(req.body)
          return user.save(); // saves document with subdocuments and triggers validation
        })
        .then((user) => {
          res.send({ user });
        })
        .catch(e => res.status(400).send(e))
           
}
