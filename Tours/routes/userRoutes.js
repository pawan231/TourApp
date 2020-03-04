const express = require('express')
const userController =require('./../controllers/userController.js')
const authController= require('./../controllers/authController');



router= express.Router();

//console.log('userRoutes.........');
router.post('/signup',authController.signup);
router.post('/login',authController.login)
router.route('/').get(userController.getAllUser);


/*
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour)

router
    .route('/:id') 
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)*/
    
module.exports=router
