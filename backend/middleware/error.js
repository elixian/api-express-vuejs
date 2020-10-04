const winston = require('winston');

module.exports= (err,req,res,next)=>{
  
    winston.error( err.message, err);
    console.error('Quelque chose à dérapé !')
    res.status(500).send('Quelque chose à dérapé !')
}