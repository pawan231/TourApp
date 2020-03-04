
const tourRouter= require('./routes/tourRoutes.js')
const userRouter= require('./routes/userRoutes.js')

const express =require('express')
const app= express()

app.use(express.json());

app.use('/api/v1/users',userRouter)
app.use('/api/v1/tours',tourRouter)



module.exports=app;


