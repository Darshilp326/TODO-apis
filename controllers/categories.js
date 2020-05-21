const Category = require("../models/Category");
const Task=require("../models/Task")


//Get A Category By particular id
// /category/:id
exports.getCategoryById=(req,res)=>{
  const _id=req.params.id
  Category.findOne({_id})
  .then(category=>{
      console.log(category)
      res.send(category)
  })
  .catch(err=>{
      res.status(500).json({err})
  })
}

// Make a new Category
// /category (POST REQUEST)
exports.postCategory = (req, res) => {
    const { name } = req.body;
    const newCategory = new Category({
      created_by: req.user.id,
      name
    });
    newCategory
      .save()
      .then((category) => {
        res.status(200).json(category);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };
  

//Get all categories of a user
// /category(GET REQUEST)
exports.getCategories = async (req, res) => {
    id = req.user.id;
    console.log(id);
    const categories = await Category.find({ created_by: id });
    res.send({ data: categories });
  };
  
  // Get All Tasks of specific category
// /category/:categoryId/tasks(GET REQUEST)
exports.getTasksOfSpecificCategory = async (req, res, next) => {
    id = req.user.id;
    console.log(id);
    const tasks = await Task.find(
      { created_by: id, category: req.params.categoryId },
      { name: 1, deadline: 1,category:1 }
    ).populate("category", "name");
    console.log(tasks)
    res.send({ data: tasks });
  };
  
  //Update a category by giving its id
// /category/:id(PATCH REQUEST)
exports.updateCategory = (req, res) => {
    id=req.params.id;
    var data={}
      Category.findOne({_id:id}).then(category =>{
        if(category)
        {
            console.log(category)
            data=category
            category.name=req.body.name;
            category.created_on=data.created_on
            category.created_by=req.user.id
  
              category
                .save()
                .then(doc => {
                  res.send(doc) 
                })
                .catch(err => console.log(err));
            
        }
        else{
            res.status(201).json({mssg:"No category found"})
        }
    
    })}
    

//Delete a category by giving its id
// /category/:categoryId(DELETE REQUEST)
exports.deleteCategory = (req, res, next) => {
    Category.findByIdAndRemove({ _id: req.params.id })
      .then((category) => {
        res.send(category);
      })
      .catch(next);
  };
  