const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')



dotenv.config({ path: '\configg.env' });

const app =  require('./app');

//console.log(process.env.PORT);

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false

}).then(con => {
    console.log(con.connections);
    console.log('DB Connection Successfull !');

})





const port = process.env.PORT || 8080;

app.listen(port, err => {
    console.log(`server is running on poer ${port}`);
})