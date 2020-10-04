
const router = require('express').Router();
const vaildateObjectId = require('../middleware/validateObjectId');
const { User, validate } = require('../models/user');


router.get('/', async (req,res)=>{
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/:id',vaildateObjectId, async(req,res)=>{
    
    let user = await User.findById(req.params.id);
    if(!user) return res.status(400).send('Impossible de récupérer l\'utilisateur');
    
    res.send(user);
})

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

router.put('/:id',vaildateObjectId, async (req, res)=>{
    
    const user = await  User.findByIdAndUpdate({_id: req.params.id}, {
        password : req.body.password,
        }, {
            new: true
        }).catch(err =>{
        if(err) return  res.status(400).send(`erreur sur le format : ${error.message}`)
    });
    res.status(201).send(user);
})


module.exports= router