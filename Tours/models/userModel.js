const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');


const userSchema =  mongoose.Schema({

    name:{
        type : String,
        required : [true,'Please enter your name']
    },
    email: {
        type: String,
        required : [true,'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter valid email id']
    },
    photo: String,
    password: {
        type: String,
        required: [true,'Please Enter a passwod'],
        minlength: 8,
        select:false
    },
    passwordConfirm:{
        type: String,
        required: [true, 'Please re-enter password' ],
        validate:{
            validator:function(el){
                return el===this.password;
            },
            messasge: 'password are not same'
        }
        
    }

});

//only run this function if password was modified
userSchema.pre('save',async function(next){

    console.log('enter into bcrypt field');

    //if(this.isModified('password')) return next();
    
    this.password=await bcrypt.hash(this.password,12);

    this.passwordConfirm=undefined;

    next();
});



userSchema.methods.correctPassword= async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

const User = mongoose.model('user',userSchema);

module.exports= User;