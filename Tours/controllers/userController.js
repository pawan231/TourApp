const User = require('./../models/userModel')
const jwt = require('jsonwebtoken')



exports.getAllUser = async (req, res) => {
    console.log('enter int get all User');


    try {


        let query =  User.find();

        const users = await query;

        res.status(200).json({
            status: "success",
            result :users.length,
            data: {
                users
            }
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'failed',
            message: err
        });
    };
}

