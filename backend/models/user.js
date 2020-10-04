const mongoose = require('mongoose');
const Joi = require('joi');
const uniqueValidator = require('mongoose-unique-validator');

const Schema =  new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique:true,
            maxlength:255,
            minlength:8
        },
        password:{
            type: String,
            maxlength:1024,
            minlength:6
        }
    }
);
Schema.plugin(uniqueValidator);
const User = mongoose.model('user',Schema);

function validateUser(user){
    const schema= Joi.object().keys({
        email : Joi.string().max(255).min(8).required().messages({"any.required": `"email" est obligatoire'`,}),
        password : Joi.string().max(1024).min(6).required(),
    });

    return schema.validate(user);
}

module.exports.User = User;

module.exports.validate  = validateUser;