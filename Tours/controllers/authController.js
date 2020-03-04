const User = require('./../models/userModel')
const jwt = require('jsonwebtoken')
const AppError= require('./../utils/appError');
const catchAsync= require('./../utils/catchAsync');



const signToken = (id)=>{
    const token = jwt.sign({ id },'secret', {
        expiresIn:'90d'
    }) 

    return token;
}



exports.signup = catchAsync(async (req,res,next)=>{

    try {
        const newUser = await User.create(req.body);

       // const token = jwt.sign({ id: newUser._id }, procees.env.JSON_SECRET, {
         //   expiresIn: process.env.JWT_EXPIRES_IN
        //})
        const token = jwt.sign({ id: newUser._id },'szdfghscvfb', {
            expiresIn:'90d'
        })
        console.log(token);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        })
    } catch (err) {
        res.status(404).json({
            message: err

        })
    }


    next();
});


exports.login=catchAsync(async (req,res,next)=>{

    const {email,password}=req.body;

    //1) check email and password exist 
    if(!email || !password){
       return next(new AppError('please provide email and password',404));
    }



    //2) check if user exist && password is correct 

    const user= await User.findOne({email}).select('+password');
    const correct =await user.correctPassword(password,user.password);

    if(!user || !correct){

        
    res.status(401).json({
        status: 'failed',
        tokenmessage: 'please enter correct password !'
        
    });
      //  return next(new AppError('please enter correct password !', 401)); 
    }

    //3)if evrything ok 
    const token=signToken(user._id);
    console.log(token);

    res.status(200).json({
        status: 'success',
        token
        
    });
    
});

