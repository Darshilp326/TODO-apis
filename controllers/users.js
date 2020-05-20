const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jwt-simple');
const moment=require('moment');


// USERS SIGNUP API
// /signup
exports.signup=(req,res)=>{
    const {name,email, password} = req.body;
    if ( !name|| !email || !password ) {
        res.status(200).json({ msg: 'Please enter all fields' });
      }
      console.log(req.body);
    User.findOne({email}).then(user => {
        if (user) {
             res.status(403).json({ message: "Email is already registered with us." });
        } else {
          const newUser = new User(req.body);
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.send(user)
                  
                })
                .catch(err =>{
                     console.log(err)
                     res.status(500).json({err})  
                });
            });
          });
        }
      });
}

function createJwtToken(user) {
    const payload = {
      user,
      iat: new Date().getTime(),
      exp: moment().add(7, 'days').valueOf()
    };
    return jwt.encode(payload, process.env.TOKEN_SECRET);
  }

 // USERS LOGIN API
 // /login 
exports.login=(req,res)=>{
    {
        const {email, password, field} = req.body;
        if ( !email || !password ) {
          res.json({ msg: 'Please enter all fields' });
        }
        User.findOne({email:email}).then(user=>{
              if(!user){
                   res.json({message:"No such user exists"});
                }
               if(user){
                 
                bcrypt.compare(password, user.password, (err, isMatch) => {
                  if (err) throw err;
                  else if (isMatch) {
                    const token = createJwtToken({
                        id: user.id
                    });
                    return res.status(200).json({user,token});
                  } else {
                    return res.json({ message: 'Password incorrect' });
                  }
                });
              }
         })
}
}