
const router = require('express').Router();
const { User, validate } = require('../models/user');


router.get('/', async (req,res)=>{
    const users = await User.find().sort('name');
    res.send(users);
});

router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return  res.status(400).send(`erreur sur le format : ${error.message}`);
    let user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user = await user.save().catch(err => {
       res.status(422).send({error : err.message});
    });
    res.status(201).send(user);
})


module.exports= router